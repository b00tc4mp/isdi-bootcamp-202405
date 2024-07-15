import getAllPosts from './getAllPosts'
import getUserName from './getUserName'
import registerUser from './registerUser'
import toggleLikePost from './toggleLikePost'
import updatePostCaption from './updatePostCaption'
import createPost from './createPost'
import deletePost from './deletePost'
import toggleFavPost from './toggleFavPost'
import getAllFavPosts from './getAllFavPosts'
import toggleFollowUser from './toggleFollowUser'
import getAllFollowingUserPosts from './getAllFollowingUserPosts'
import authenticateUser from './authenticateUser'

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
    getAllFollowingUserPosts,
    authenticateUser
}

export default logic