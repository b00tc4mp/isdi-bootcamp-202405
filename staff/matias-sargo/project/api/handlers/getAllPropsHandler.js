import { logic } from '../../cor/index.js';

export default (req, res, next) => {
    const { userId } = req;

    try {
        logic.getAllProps(userId)
            .then(properties => res.json(properties))  
            .catch(error => next(error));
    } catch (error) {
        next(error);
    }
};