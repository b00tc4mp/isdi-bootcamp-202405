import registerUser from './registerUser.js'
import authenticateUser from './authenticateUser.js'
import registerPetsitter from './registerPetsitter.js'
import getUser from './getUser.js'
import updateUser from './updateUser.js'
import createPetsitter from './createPetsitter.js'
import deletePetsitter from './deletePetsitter.js'

const logic = {
    registerUser,
    registerPetsitter,
    authenticateUser,
    getUser,
    updateUser,
    createPetsitter,
    deletePetsitter
}

export default logic