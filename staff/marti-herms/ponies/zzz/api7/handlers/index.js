import registerUserHandler from './registerUserHandler.js'
import authenticateUserHandler from './authenticateUserHandler.js'
import getUserNameHandler from './getUserNameHandler.js'
import getAllPostsHandler from './getAllPostsHandler.js'
import getFollowedUserPostsHandler from './getFollowedUserPostsHandler.js'
import getUserSavedPostsHandler from './getUserSavedPostsHandler.js'
import getUserPostsHandler from './getUserPostsHandler.js'
import getUserListHandler from './getUserListHandler.js'
import getUserHandler from './getUserHandler.js'
import createPostHandler from './createPostHandler.js'
import deletePostHandler from './deletePostHandler.js'
import togglePostLikeHandler from './togglePostLikeHandler.js'
import toggleSavedPostHandler from './toggleSavedPostHandler.js'
import toggleUserFollowHandler from './toggleUserFollowHandler.js'
import editPostHandler from './editPostHandler.js'
import editUserUsernameHandler from './editUserUsernameHandler.js'
import editUserAvatarHandler from './editUserAvatarHandler.js'

export default {
    registerUser: registerUserHandler,
    authenticateUser: authenticateUserHandler,
    getUserName: getUserNameHandler,
    getAllPosts: getAllPostsHandler,
    getFollowedUserPosts: getFollowedUserPostsHandler,
    getUserSavedPosts: getUserSavedPostsHandler,
    getUserPosts: getUserPostsHandler,
    getUserList: getUserListHandler,
    getUser: getUserHandler,
    createPost: createPostHandler,
    deletePost: deletePostHandler,
    togglePostLike: togglePostLikeHandler,
    toggleSavedPost: toggleSavedPostHandler,
    toggleUserFollow: toggleUserFollowHandler,
    editPost: editPostHandler,
    editUserUsername: editUserUsernameHandler,
    editUserAvatar: editUserAvatarHandler
}