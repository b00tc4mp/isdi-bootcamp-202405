import busboy from 'busboy';
import { logic } from '../../cor/index.js';  // Asegúrate de que la lógica esté correctamente importada

export default (req, res) => {
  const bb = busboy({ headers: req.headers });
  const fileData = {};
  let fileBuffer = null;

  bb.on('file', (name, file, info) => {
    const chunks = [];
    file.on('data', (chunk) => chunks.push(chunk));
    file.on('end', () => {
      fileBuffer = Buffer.concat(chunks);
      fileData.filename = `${info.filename}`;
    });
  });

  bb.on('field', (name, value) => {
    fileData[name] = value;
  });

  bb.on('finish', () => {
    const { propertyId, type, url } = fileData;

    if (!fileBuffer || !propertyId || !type) {
      return res.status(400).json({ error: 'BadRequest', message: 'Missing required fields' });
    }

    logic.createDocument(propertyId, fileBuffer, type, url)
      .then(() => res.status(201).send())
      .catch((error) => {
        console.error("Error al crear el documento:", error);
        res.status(500).json({ error: 'SystemError', message: error.message });
      });
  });

  bb.on('error', (error) => {
    console.error("Error en Busboy:", error);
    res.status(500).json({ error: 'SystemError', message: error.message });
  });

  req.pipe(bb);
};
