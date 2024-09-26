import registerUser from './registerUser.js'
import authenticateUser from './authenticateUser.js'
import getUserName from './getUserName.js'
import updateEmail from './updateEmail.js'
import updatePassword from './updatePassword.js'
import updateUserAddress from './updateUserAddress.js'
import updateUserPhone from './updateUserPhone.js'
import createProduct from './createProduct.js'
import updateProductPrice from './updateProductPrice.js'
import updateProductImage from './updateProductImage.js'
import toggleProductEnable from './toggleProductEnable.js'
import deleteProduct from './deleteProduct.js'
import getAllUserProducts from './getAllUserProducts.js'
import updateProductLocation from './updateProductLocation.js'
import searchProducts from './searchProducts.js'

const logic = {
    registerUser,
    authenticateUser,
    getUserName,
    updateEmail,
    updatePassword,
    updateUserAddress,
    updateUserPhone,
    createProduct,
    updateProductPrice,
    updateProductImage,
    toggleProductEnable,
    deleteProduct,
    getAllUserProducts,
    updateProductLocation,
    searchProducts
}

export default logic