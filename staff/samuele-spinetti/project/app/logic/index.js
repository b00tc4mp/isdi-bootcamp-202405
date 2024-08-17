import getUserName from './getUserName'
import isUserLoggedIn from './isUserLoggedIn'
import loginUser from './loginUser'
import logoutUser from './logoutUser'
import registerUser from './registerUser'
import getUser from './getUser'
import updateAvatar from './updateAvatar'
import updatePassword from './updatePassword'
import getAllHCPs from './getAllHCPs'
import searchHCP from './searchHCP'
import getAllNews from './getAllNews'
import fetchNews from './fetchNews'
import toggleSaveNews from './toggleSaveNews'

const logic = {
    isUserLoggedIn,
    loginUser,
    logoutUser,
    registerUser,
    getUserName,
    getUser,
    updateAvatar,
    updatePassword,
    getAllHCPs,
    searchHCP,
    getAllNews,
    fetchNews,
    toggleSaveNews
}

export default logic