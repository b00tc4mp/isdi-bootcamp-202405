import authenticateUser from './authenticateUser.js'
import getUserName from './getUserName.js'
import registerUser from './registerUser.js'
import getUser from './getUser.js'
import updateAvatar from './updateAvatar.js'
import updatePassword from './updatePassword.js'
import getAllHCPs from './getAllHCPs.js'
import searchHCP from './searchHCP.js'
import getAllNews from './getAllNews.js'

const logic = {
    authenticateUser,
    registerUser,
    getUserName,
    getUser,
    updateAvatar,
    updatePassword,
    getAllHCPs,
    searchHCP,
    getAllNews
}

export default logic