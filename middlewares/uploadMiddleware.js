import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the upload directory
const uploadDir = path.resolve('uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

export const uploadAndParse = (req, res, next) => {
    try{
        upload.single('file')(req, res, function (err) {
            if (err) {
                return res.status(500).json({ message: 'Error uploading file', error: err.message });
            }
            
            // Convert form-data fields to JSON format
            if (req.body) {
                for (const key in req.body) {
                    if (Object.hasOwnProperty.call(req.body, key)) {
                        try {
                            req.body[key] = JSON.parse(req.body[key]);
                        } catch (e) {
                            // If it's not JSON, retain the original string value
                            console.log(`Error parsing JSON: ${key}`, e);
                        }
                    }
                }
            }else{
                console.log("No form data found");
            }
            
            next();
        });
    }catch(error){
        console.log("Multer Upload error:",error);
        return res.status(500).json({
            message: 'Internal Server error'
        });
    }
};
