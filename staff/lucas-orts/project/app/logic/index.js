import registerUser from './registerUser.js'
import loginUser from './loginUser.js'
import getUserName from './getUserName.js'
import isUserLoggedIn from './isUserLoggedIn.js'
import logoutUser from './logoutUser.js'
import updateEmail from './updateEmail.js'
import updatePassword from './updatePassword.js'
import updateUserPhone from './updateUserPhone.js'
import updateUserAddress from './updateUserAddress.js'
import createProduct from './createProduct.js'

const logic = {
    registerUser,
    loginUser,
    getUserName,
    isUserLoggedIn,
    logoutUser,
    updateEmail,
    updatePassword,
    updateUserPhone,
    updateUserAddress,
    createProduct
}

export default logic
