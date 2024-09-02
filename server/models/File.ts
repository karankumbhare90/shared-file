import mongoose, { Document } from "mongoose";

const fileSchema = new mongoose.Schema(
    {
        filename: {
            type: String,
            required: true
        },

        secureURL: {
            type: String,
            required: true
        },
        format: {
            type: String,
            required: true
        },
        sizeInBytes: {
            type: Number,
            required: true
        },
        sender: {
            type: String
        },
        receiver: {
            type: String
        },
    },
    {
        timestamps: true,
    }
);


interface IFile extends Document {
    filename: String,
    secureURL: string,
    format: String,
    sizeInBytes: number,
    sender?: String,
    receiver?: String
}

export default mongoose.model<IFile>("File", fileSchema);