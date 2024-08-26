import registerUser from './registerUser'
import registerPetsitterUser from './registerPetsitterUser'
import getUser from './getUser'
import getUserId from './getUserId'
import getUserRole from './getUserRole'
import loginUser from './loginUser'
import isUserLoggedIn from './isUserLoggedIn'
import logoutUser from './logoutUser'
import updateUser from './updateUser'
import searchPetsitters from './searchPetsitters'
import getAllPetsitters from './getAllPetsitters'
import getPetsitterDetails from './getPetsitterDetails'

const logic = {
    registerUser,
    registerPetsitterUser,
    getUser,
    getUserId,
    getUserRole,
    loginUser,
    isUserLoggedIn,
    logoutUser,
    updateUser,
    searchPetsitters,
    getAllPetsitters,
    getPetsitterDetails
}

export default logic