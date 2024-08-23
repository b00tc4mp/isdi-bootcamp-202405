import registerUser from './registerUser.js'
import authenticateUser from './authenticateUser.js'
import registerPetsitterUser from './registerPetsitterUser.js'
import getUser from './getUser.js'
import updateUser from './updateUser.js'
import getAllPetsitters from './getAllPetsitters.js'
import searchPetsitters from './searchPetsitters.js'

const logic = {
    registerUser,
    registerPetsitterUser,
    authenticateUser,
    getUser,
    updateUser,
    getAllPetsitters,
    searchPetsitters
}

export default logic