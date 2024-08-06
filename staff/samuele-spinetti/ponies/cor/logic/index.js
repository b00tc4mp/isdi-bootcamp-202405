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
import getAllFollowingUserPosts from './getAllFollowingUserPosts.js'
import updateAvatar from './updateAvatar.js'
import getUser from './getUser.js'
import updatePassword from './updatePassword.js'
import authenticateUser from './authenticateUser.js'
import searchPosts from './searchPosts.js'

const logic = {
    authenticateUser,
    createPost,
    deletePost,
    getAllFavPosts,
    getAllFollowingUserPosts,
    getAllPosts,
    getUser,
    getUserName,
    registerUser,
    toggleFavPost,
    toggleFollowUser,
    toggleLikePost,
    updateAvatar,
    updatePassword,
    updatePostCaption,
    searchPosts
}

export default logic