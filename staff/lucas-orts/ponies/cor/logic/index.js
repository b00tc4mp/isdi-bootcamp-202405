import getAllPosts from './getAllPosts.js'
import getUserName from './getUserName.js'
import registerUser from './registerUser.js'
import toggleLikePost from './toggleLikePost.js'
import updatePostCaption from './updatePostCaption.js'
import createPost from './createPost.js'
import deletePost from './deletePost.js'
import getUser from './getUser.js'
import toggleFavPost from './toggleFavPost.js'
import getAllFavPosts from './getAllFavPosts.js'
import toggleFollowUser from './toggleFollowUser.js'
import getAllFollowingUserPosts from './getAllFollowingUserPosts.js'
import authenticateUser from './authenticateUser.js'
import searchPosts from './searchPosts.js'

const logic = {
    getAllPosts,
    getUserName,
    getUser,
    registerUser,
    toggleLikePost,
    updatePostCaption,
    createPost,
    deletePost,
    toggleFavPost,
    getAllFavPosts,
    toggleFollowUser,
    getAllFollowingUserPosts,
    authenticateUser,
    searchPosts
}

export default logic