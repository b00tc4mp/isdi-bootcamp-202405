import registerUser from './registerUser.js'
import authenticateUser from './authenticateUser.js'
import createProp from './createProp.js'
import getAllProps from './getAllProps.js'
import createReview from './createReview.js'
import createContract from './createContract.js'
import {signContract} from './signContract.js'
import { getUserContracts } from './getUserContracts.js'
import { endContract } from './endContract.js'


const logic = {
    authenticateUser,
    registerUser,
    createProp,
    getAllProps,
    createReview,
    createContract,
    signContract,
    getUserContracts,
    endContract,

}

export default logic