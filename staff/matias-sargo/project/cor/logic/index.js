import registerUser from './registerUser.js'
import authenticateUser from './authenticateUser.js'
import createProp from './createProp.js'
import getAllProps from './getAllProps.js'
import createReview from './createReview.js'
import createContract from './createContract.js'
import signContract from './signContract.js'
import { getUserContracts } from './getUserContracts.js'
import createDocument from './createDocument.js'
import getDocument from './getDocument.js'
import saveFile from './saveFile.js'



const logic = {
    authenticateUser,
    registerUser,
    createProp,
    getAllProps,
    createReview,
    createContract,
    signContract,
    getUserContracts,
    createDocument,
    getDocument,
    saveFile

    

}

export default logic