import { logic } from '../../cor/index.js';

export default (req, res, next) => {
    const { userId } = req;

    const { images, title, description, address, latitude, longitude, price, type } = req.body;

    try {
        logic.createProp(userId, images, title, description, address, latitude, longitude, price, type)
            .then(() => res.status(201).send())
            .catch(error => next(error));
    } catch (error) {
        next(error);
    }
};