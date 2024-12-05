import addPost from './addPost.js'
import deletePost from './deletePost.js'
import editPost from './editPost.js'
import editUserInfo from './editUserInfo.js'
import getAllPosts from './getAllPosts.js'
import getFollowedUserPosts from './getFollowedUserPosts.js'
import getUser from './getUser.js'
import getUserList from './getUserList.js'
import getUserName from './getUserName.js'
import getUserSavedPosts from './getUserSavedPosts.js'
import getUserPosts from './getUserPosts.js'
import authenticateUser from './authenticateUser.js'
import registerUser from './registerUser.js'
import toggleUserFollow from './toggleUserFollow.js'
import togglePostLike from './togglePostLike.js'
import toggleSavedPost from './toggleSavedPost.js'

const logic = {
    addPost,
    deletePost,
    editPost,
    editUserInfo,
    getAllPosts,
    getFollowedUserPosts,
    getUser,
    getUserList,
    getUserName,
    getUserSavedPosts,
    getUserPosts,
    authenticateUser,
    registerUser,
    toggleUserFollow,
    togglePostLike,
    toggleSavedPost
}

export default logic