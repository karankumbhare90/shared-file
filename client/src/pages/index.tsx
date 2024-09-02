import DownloadFile from "@/components/DownloadFile";
import Dropzone from "@/components/Dropzone";
import EmailForm from "@/components/EmailForm";
import RenderFile from "@/components/RenderFile";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
    const [file, setFile] = useState(null);
    const [id, setId] = useState(null);
    const [downloadPageLink, setDownloadPageLink] = useState(null);
    const [uploadStatus, setUploadStatus] = useState<"Uploading..." | "Upload Failed" | "Uploaded" | "Upload">("Upload");

    const handleUpload = async () => {
        if (uploadStatus === "Uploading...") return;

        setUploadStatus("Uploading...");
        const formData = new FormData();
        formData.append('myFile', file);

        try {
            const { data } = await axios({
                method: 'POST',
                data: formData,
                url: "api/files/upload",
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            setDownloadPageLink(data.downloadPageLink);
            setId(data.id);
            setUploadStatus("Uploaded");
            toast.success('File is Uploaded');
        } catch (error) {
            console.log(error);
            setUploadStatus("Upload Failed");
            toast.error('File Upload failed');
        }
    }

    const resetComponent = () => {
        setFile(null);
        setDownloadPageLink(null);
    }

    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="my-3 text-3xl font-semibold">Got a File ? Share it..</h1>

            <div className="w-96 flex flex-col gap-3 items-center justify-center shadow-custom_first rounded-[3px] p-5">
                {/* File Drop component */}
                {!downloadPageLink && <Dropzone setFile={setFile} />}
                {/* Render File */}
                {file && (
                    <RenderFile file={{
                        format: file.type.split("/")[0],
                        name: file.name,
                        sizeInBytes: file.size,
                    }} />
                )}
                {/* Upload Button */}

                {!downloadPageLink && file && (
                    <button
                        className="w-full bg-primary text-white p-2 rounded-[3px] font-semibold text-[14px] focus:outline-none"
                        onClick={handleUpload}
                    >
                        {uploadStatus}
                    </button>
                )}

                {downloadPageLink &&
                    <div className="w-96 px-5 py-3 flex flex-col gap-3">
                        <DownloadFile downloadPageLink={downloadPageLink} />

                        {/* Email Form */}
                        {/* <EmailForm id={id} /> */}

                        <button
                            className="mt-2 w-full bg-primary text-white p-2 rounded-[3px] font-semibold text-[14px] focus:outline-none"
                            onClick={resetComponent}
                        >
                            Upload New File
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}