import getAllPosts from './getAllPosts.js'
import getUserName from './getUserName.js'
import registerUser from './registerUser.js'
import toggleLikePost from './toggleLikePost.js'
import updatePostCaption from './updatePostCaption.js'
import createPost from './createPost.js'
import deletePost from './deletePost.js'
import toggleFavPost from './toggleFavPost.js'
import getAllFavPosts from './getAllFavPosts.js'
import toggleFollowUser from './toggleFollowUser.js'
import getAllPoniesPosts from './getAllPoniesPosts.js'
import authenticateUser from './authenticateUser.js'

const logic = {
    authenticateUser,
    createPost,
    deletePost,
    getAllFavPosts,
    getAllPoniesPosts,
    getAllPosts,
    getUserName,
    registerUser,
    toggleFavPost,
    toggleFollowUser,
    toggleLikePost,
    updatePostCaption
}

export default logic