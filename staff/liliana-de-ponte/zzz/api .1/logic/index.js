import getAllPosts from './getAllPosts.js'
import getUserName from './getUserName.js'
import getUserUsername from './getUserUsername.js'
import loginUser from './loginUser.js'
import logoutUser from './logoutUser.js'
import registerUser from './registerUser.js'
import toggleLikePost from './toggleLikePost.js'
import updatePostCaption from './updatePostCaption.js'
import createPost from './createPost.js'
import deletePost from './deletePost.js'
import toggleFavPost from './toggleFavPost.js'
import getAllFavPosts from './getAllFavPosts.js'
import toggleFollowUser from './toggleFollowUser.js'
import getAllPoniesPosts from './getAllPoniesPosts.js'
import isUserLoggedIn from './isUserLoggedIn.js'
import authenticateUser from './authenticateUser.js'

const logic = {
    getAllPosts,
    getUserName,
    registerUser,
    toggleLikePost,
    updatePostCaption,
    createPost,
    deletePost,
    toggleFavPost,
    getAllFavPosts,
    toggleFollowUser,
    getAllPoniesPosts,
    isUserLoggedIn, 
    authenticateUser
}

export default logic