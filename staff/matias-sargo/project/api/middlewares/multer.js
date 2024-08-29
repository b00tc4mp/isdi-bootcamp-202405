import multer from 'multer';

// Configura multer para almacenar archivos en una carpeta temporal
const upload = multer({ dest: 'uploads/' });