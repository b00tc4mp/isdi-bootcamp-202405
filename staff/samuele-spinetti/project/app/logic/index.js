import getUserName from './getUserName.js'
import isUserLoggedIn from './isUserLoggedIn.js'
import loginUser from './loginUser.js'
import logoutUser from './logoutUser.js'
import registerUser from './registerUser.js'
import getUser from './getUser.js'
import updateAvatar from './updateAvatar.js'
import updatePassword from './updatePassword.js'

const logic = {
    isUserLoggedIn,
    loginUser,
    logoutUser,
    registerUser,
    getUserName,
    getUser,
    updateAvatar,
    updatePassword
}

export default logic