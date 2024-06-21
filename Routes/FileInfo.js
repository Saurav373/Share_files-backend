import { File } from "../Schema/fileSchema.js"

export const FileInfo = async (req, res) => {
    try {
        const { uniqueId } = req.body;
        const data = await File.findOne({ uuid: uniqueId })
        if (!data) {
            return res.json({ status: false })
        }
        const { filename, originalname, size, createdAt } = data
        const createDate = new Date(createdAt)
        const expireTimer = Math.floor(49 - ((new Date() - createDate) / 1000 / 60 / 60))
        return res.send({ filename, originalname, size, status: true, expireTimer })
    } catch (err) {
        console.log('Error ', err);
        return res.status(400).json({ err: 'Internal Server error' })
    }
}