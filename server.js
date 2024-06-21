import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { dirname, join } from 'path';
import fs from 'fs'
import { fileURLToPath } from 'url';
import { connectToMongoDB } from './DB/db.js'
import { upload } from './Controllers/multerConfig.js'
import { uploadFile } from './Routes/uploadFile.js'
import { FileInfo } from './Routes/FileInfo.js'
import { DownloadFile } from './Routes/DownloadFile.js';
import deleteFiles from './Controllers/DeleteFiles.js';

const app = express()

const PORT = 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __uploadsDir = join(__dirname, 'uploads');


if (!fs.existsSync(__uploadsDir)){
    fs.mkdirSync(__uploadsDir)
}

dotenv.config()
app.use(cors())
app.use(express.json())
app.use(express.static(__uploadsDir));


connectToMongoDB()
deleteFiles(__dirname)

app.post('/upload', upload.single('file'), uploadFile)
app.post('/fileinfo', FileInfo)
app.get('/download/:uuid', DownloadFile)

app.listen(PORT, () => {
    console.log('Server Started succesfully :' + PORT);
})