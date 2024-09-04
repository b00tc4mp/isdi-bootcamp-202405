import { logic } from '../../cor/index.js';

export default (req, res, next) => {
    const { userId } = req;  // Asumiendo que el `userId` está incluido en el token JWT y fue verificado por el middleware.

    const { propertyId, ownerId, tenantId, startDate, endDate, price } = req.body;

    try {
        logic.createContract(propertyId, ownerId || userId, tenantId, startDate, endDate, price)  // Usa `ownerId` del cuerpo, pero si no está presente, usa `userId`.
            .then(() => res.status(201).send())
            .catch(error => next(error));
    } catch (error) {
        next(error);
    }
};