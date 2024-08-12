import { logic } from '../../cor/index.js'

export default (req, res, next) => {
    const { name, surname, email, username, password, passwordRepeat } = req.body

    try {
        logic.registerUser(name, surname, email, username, password, passwordRepeat)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
}

//TODO 
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzYW11IiwiaWF0IjoxNzIyNjAzMTMyfQ.6VpB47E1I1oBU64Cc0Z42c5F8C--GRM8gwlAOfEDYAE