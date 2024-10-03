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
import updateProductPrice from './updateProductPrice.js'
import updateProductImage from './updateProductImage.js'
import toggleProductEnable from './toggleProductEnable.js'
import deleteProduct from './deleteProduct.js'
import getAllUserProducts from './getAllUserProducts.js'
import updateProductLocation from './updateProductLocation.js'
import searchProducts from './searchProducts.js'
import addCartProduct from './addCartProduct.js'
import deleteCartProduct from './deleteCartProduct.js'
import getAllCartProducts from './getAllCartProducts.js'
import productInfo from './productInfo.js'
import counCartProducts from './counCartProducts.js'

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
    createProduct,
    updateProductPrice,
    updateProductImage,
    toggleProductEnable,
    deleteProduct,
    getAllUserProducts,
    updateProductLocation,
    searchProducts,
    addCartProduct,
    deleteCartProduct,
    getAllCartProducts,
    productInfo,
    counCartProducts
}

export default logic
