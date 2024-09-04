import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Calcular el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function saveFile(fileStream, filename, callback) {
    const savePath = path.join(__dirname, 'uploads', filename); // Asegúrate de que el directorio 'uploads' exista

    // Crea el directorio si no existe
    if (!fs.existsSync(path.dirname(savePath))) {
        fs.mkdirSync(path.dirname(savePath), { recursive: true });
    }

    const writeStream = fs.createWriteStream(savePath);

    fileStream.pipe(writeStream);

    writeStream.on('finish', () => {
        callback(null);
    });

    writeStream.on('error', (error) => {
        callback(error);
    });
}

export default saveFile;
