import getDocument from '../../cor/logic/getDocument.js';

export default (req, res, next) => {
    const { propertyId, documentType } = req.params;

    try {
        getDocument(propertyId, documentType)
            .then(document => {
                if (!document.content) {
                    return res.status(404).json({ error: 'NotFoundError', message: 'Document content not found' });
                }

                // Establecer el tipo de contenido y enviar el archivo como respuesta
                res.set('Content-Type', 'application/pdf');  // Cambia 'application/pdf' según el tipo de documento
                res.send(document.content);
            })
            .catch(next);
    } catch (error) {
        next(error);
    }
};
