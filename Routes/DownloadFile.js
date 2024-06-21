import { File } from "../Schema/fileSchema.js";

export const DownloadFile = async (req, res) => {
    try {
        const { uuid } = req.params;
        const data = await File.findOne({ uuid })
        if (!data) {
            return res.send('Invalid Url')
        }
        return res.send(`/uploads/${data.filename}`)
    } catch (err) {
        console.log('Error ',err);
        return res.status(400).json({err:'Internal Server error'})
    }
}