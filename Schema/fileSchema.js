import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
    filename: {
        require: true,
        type: String
    },
    originalname: {
        require: true,
        type: String
    },
    size: {
        require: true,
        type: Number
    },
    uuid: {
        require: true,
        type: String
    }, mimetype: {
        type: String
    }
}, { timestamps: true })

export const File = mongoose.model('File', FileSchema);
