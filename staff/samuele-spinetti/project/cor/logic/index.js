import authenticateUser from './authenticateUser.js'
import registerUser from './registerUser.js'
import getUser from './getUser.js'
import updateAvatar from './updateAvatar.js'
import updatePassword from './updatePassword.js'
import getAllHCPs from './getAllHCPs.js'
import searchHCP from './searchHCP.js'
import getAllNews from './getAllNews.js'
import toggleSaveNews from './toggleSaveNews.js'
import getNews from './getNews.js'
import getAllSavedNews from './getAllSavedNews.js'
import createPost from './createPost.js'
import getAllPosts from './getAllPosts.js'
import deletePost from './deletePost.js'
import toggleLikePost from './toggleLikePost.js'
import createComment from './createComment.js'
import getAllComments from './getAllComments.js'
import deleteComment from './deleteComment.js'

const logic = {
    authenticateUser,
    registerUser,
    getUser,
    updateAvatar,
    updatePassword,
    getAllHCPs,
    searchHCP,
    getAllNews,
    toggleSaveNews,
    getNews,
    getAllSavedNews,
    createPost,
    getAllPosts,
    deletePost,
    toggleLikePost,
    createComment,
    getAllComments,
    deleteComment
}

export default logic