import { logic } from '../../cor/index.js';
import fs from 'fs';

export default (req, res, next) => {
    const { propertyId, type, url } = req.body;
    const file = req.file;  // Aquí se encuentra el archivo subido por `multer`

    if (!file) {
        return res.status(400).json({ error: 'BadRequest', message: 'File is required' });
    }

    try {
        logic.createDocument(propertyId, file.path, type, url)
            .then(() => {
                fs.unlinkSync(file.path);  // Elimina el archivo temporal después de guardarlo
                res.status(201).send();
            })
            .catch(error => {
                fs.unlinkSync(file.path);  // Asegúrate de eliminar el archivo temporal si ocurre un error
                next(error);
            });
    } catch (error) {
        if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);  // Elimina el archivo si ocurre un error en la escritura
        }
        next(error);
    }
};
