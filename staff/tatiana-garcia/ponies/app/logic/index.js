import getAllPosts from './getAllPosts'
import getUserName from './getUserName'
import getUserId from './getUserId'
import loginUser from './loginUser'
import logoutUser from './logoutUser'
import registerUser from './registerUser'
import toggleLikePost from './toggleLikePost'
import updatePostCaption from './updatePostCaption'
import createPost from './createPost'
import deletePost from './deletePost'
import toggleFavPost from './toggleFavPost'
import getAllFavPosts from './getAllFavPosts'
import toggleFollowUser from './toggleFollowUser'
import getAllPoniesPosts from './getAllPoniesPosts'
import isUserLoggedIn from './isUserLoggedIn'

const logic = {
    getAllPosts,
    getUserName,
    getUserId,
    loginUser,
    logoutUser,
    registerUser,
    toggleLikePost,
    updatePostCaption,
    createPost,
    deletePost,
    toggleFavPost,
    getAllFavPosts,
    toggleFollowUser,
    getAllPoniesPosts,
    isUserLoggedIn
}

export default logic