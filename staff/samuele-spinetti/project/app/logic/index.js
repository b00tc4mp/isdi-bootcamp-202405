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
import getNews from './getNews'
import toggleSaveNews from './toggleSaveNews'
import getAllSavedNews from './getAllSavedNews'

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
    getNews,
    toggleSaveNews,
    getAllSavedNews
}

export default logic