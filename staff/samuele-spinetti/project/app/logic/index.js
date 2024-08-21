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
import createPost from './createPost'
import getAllPosts from './getAllPosts'
import getUserId from './getUserId'
import deletePost from './deletePost'
import toggleLikePost from './toggleLikePost'
import createComment from './createComment'
import getAllComments from './getAllComments'
import deleteComment from './deleteComment'

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
    getAllSavedNews,
    createPost,
    getAllPosts,
    getUserId,
    deletePost,
    toggleLikePost,
    createComment,
    getAllComments,
    deleteComment
}

export default logic