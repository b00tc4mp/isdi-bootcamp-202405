import { logic } from '../../cor/index.js';

export default (req, res, next) => {
    const { userId } = req;  // Obtenido del middleware
    const { contractId } = req.params;

    try {
        logic.signContract(userId, contractId)
            .then(() => res.status(200).send()) 
            .catch(error => next(error));  
    } catch (error) {
        next(error);  
    }
};