import registerUserHandler from '../handlers/registerUserHandler.js'
import authenticateUserHandler from '../handlers/authenticateUserHandler.js'
import getUserNameHandler from '../handlers/getUserNameHandler.js'
import getAllPostsHandler from '../handlers/getAllPostsHandler.js'
import getAllFollowingUserPostsHandler from '../handlers/getAllFollowingUserPostsHandler.js'
import getAllFavPostsHandler from '../handlers/getAllFavPostsHandler.js'
import createPostHandler from '../handlers/createPostHandler.js'
import deletePostHandler from '../handlers/deletePostHandler.js'
import toggleLikePostHandler from '../handlers/toggleLikePostHandler.js'
import toggleFavPostHandler from '../handlers/toggleFavPostHandler.js'
import toggleFollowUserHandler from '../handlers/toggleFollowUserHandler.js'
import updatePostCaptionHandler from '../handlers/updatePostCaptionHandler.js'
import searchPostsHandler from '../handlers/searchPostsHandler.js'

export {
    registerUserHandler,
    authenticateUserHandler,
    getUserNameHandler,
    getAllPostsHandler,
    getAllFollowingUserPostsHandler,
    getAllFavPostsHandler,
    createPostHandler,
    deletePostHandler,
    toggleLikePostHandler,
    toggleFavPostHandler,
    toggleFollowUserHandler,
    updatePostCaptionHandler,
    searchPostsHandler
}