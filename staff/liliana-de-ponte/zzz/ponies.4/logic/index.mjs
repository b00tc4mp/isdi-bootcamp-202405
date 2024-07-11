import getAllPosts from './getAllPosts.mjs'
import getUserName from './getUserName.mjs'
import getUserUsername from './getUserUsername.mjs'
import loginUser from './loginUser.mjs'
import logoutUser from './logoutUser.mjs'
import registerUser from './registerUser.mjs'
import toggleLikePost from './toggleLikePost.mjs'
import updatePostCaption from './updatePostCaption.mjs'
import createPost from './createPost.mjs'
import deletePost from './deletePost.mjs'
import toggleFavPost from './toggleFavPost.mjs'
import getAllFavPosts from './getAllFavPosts.mjs'
import toggleFollowUser from './toggleFollowUser.mjs'
import getAllPoniesPosts from './getAllPoniesPosts.mjs'

const logic = {
    getAllPosts,
    getUserName,
    getUserUsername,
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
    getAllPoniesPosts
}

export default logic