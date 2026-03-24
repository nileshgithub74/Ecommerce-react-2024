import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const uploadDir = path.join(__dirname, '../upload/images');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename:    (_req, file, cb) =>
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`),
});

const upload = multer({ storage });
export default upload;
