import { File } from '../Schema/fileSchema.js'
import { v4 as uuidv4 } from 'uuid';

export const uploadFile = (req, res) => {
    try {
        const { originalname, mimetype, filename, size } = req.file
        const uniqueId = uuidv4();
        const newFile = new File({ originalname, mimetype, filename, size, uuid: uniqueId });
        newFile.save()
        return res.send({ downloadLink: uniqueId });
    } catch (err) {
        console.log('Error ', err);
        return res.status(400).json({ err: 'Internal Server error' })
    }
}