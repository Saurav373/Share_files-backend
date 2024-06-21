import fs from 'fs';
import path from 'path';
import schedule from 'node-schedule';
import { File } from '../Schema/fileSchema.js';

const deleteExpiredFiles = (__dirname) => {
    // Schedule job to run every 1 hour
    schedule.scheduleJob('0 * * * *', async () => {

        const uploadDir = path.join(__dirname, 'uploads'); 
        try {
            const files = await File.find({
                createdAt: { $lt: new Date(Date.now() - 1000*60*60*48) } 
            });

            for (const file of files) {
                const filePath = path.join(uploadDir, file.filename);
                fs.unlink(filePath, async (err) => {
                    if (err) {
                        console.error(`Error deleting file: ${file.filename}`, err);
                    } else {
                        await File.deleteOne({ _id: file._id });
                    }
                });
            }
        } catch (error) {
            console.error('Error deleting expired files:', error);
        }
    });
};

export default deleteExpiredFiles ;
