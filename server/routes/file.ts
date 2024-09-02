import express from 'express'
import multer from 'multer';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import https from 'https'
import nodemailer from 'nodemailer';

import File from '../models/File';
import CreateEmailTemplate from '../utils/CreateEmailTemplate';
const router = express.Router();

// create storage using multer

const storage = multer.diskStorage({});

let upload = multer({
    storage
})

// Upload file router
router.post('/upload', upload.single('myFile'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).send({ message: 'Hey bro !! We need the file' });

        console.log(req.file);

        let uploadedFile: UploadApiResponse;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                folder: "shareMeYT",
                resource_type: "auto"
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'Cloudinary Error' })
        }

        const { originalname } = req.file;
        const { secure_url, bytes, format } = uploadedFile;

        const file = await File.create({
            filename: originalname,
            sizeInBytes: bytes,
            secureURL: secure_url,
            format
        })

        res.status(200).json({
            id: file._id,
            downloadPageLink: `${[process.env.API_BASE_ENDPOINT_CLIENT]}download/${file._id}`,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' })
    }
})

// Get the download link
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const file = await File.findById(id);

        if (!file) {
            return res.status(404).json({ message: "File Not Found" });
        }

        const { filename, format, sizeInBytes } = file;

        return res.status(200).json({
            name: filename,
            format,
            sizeInBytes,
            id
        })

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
})

// Download the content
router.get('/:id/download', async (req, res) => {
    try {
        const id = req.params.id;
        const file = await File.findById(id);

        if (!file) {
            return res.status(404).json({ message: "File Not Found" });
        }

        https.get(file.secureURL, (fileStream) => {
            fileStream.pipe(res);
        })

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
})

// Email 
router.post('/email', async (req, res) => {

    // Validate Request
    const { id, emailFrom, emailTo } = req.body;
    //@ts-ignore

    if (!id | !emailFrom | !emailTo) {
        return res.status(400).json({ message: "Invalid Data" })
    }

    // Check if the file exists or not
    const file = await File.findById(id);

    if (!file) {
        return res.status(404).json({ message: "File not found" });
    }

    // Create nodemailer transporter
    let transporter = nodemailer.createTransport({
        // @ts-ignore

        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        },
    });

    // Prepare the email data
    const { filename, sizeInBytes } = file;

    const fileSize = `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
    const downloadPageLink = `${[process.env.API_BASE_ENDPOINT_CLIENT]}download/${id}`;

    // Send Mail Using Transporter
    await transporter.sendMail({
        from: emailFrom,
        to: emailTo,
        subject: "File Shared with you",
        text: `${emailFrom} Shared file with you`,
        html: CreateEmailTemplate(emailFrom, downloadPageLink, filename, fileSize), // html body
    }, async (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        file.sender = emailFrom;
        file.receiver = emailTo;

        await file.save();

        return res.status(200).json({ message: "Email Sent" });
    });

})
export default router;