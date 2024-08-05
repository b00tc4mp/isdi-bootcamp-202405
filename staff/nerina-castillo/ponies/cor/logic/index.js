import getAllPosts from "./getAllPosts.js";
import getUserName from "./getUserName.js";
import authenticateUser from "./authenticateUser.js";
import registerUser from "./registerUser.js";
import toggleLikePost from "./toggleLikePost.js";
import updatePostCaption from "./updatePostCaption.js";
import createPost from "./createPost.js";
import deletePost from "./deletePost.js";
import toggleFavPost from "./toggleFavPost.js";
import getAllFavPosts from "./getAllFavPosts.js";
import toggleFollowUser from "./toggleFollowUser.js";
import getAllFollowingUserPosts from "./getAllFollowingUserPosts.js";
import searchPosts from "./searchPosts.js";
// import createAvatar from "./createAvatar.js";

const logic = {
  getAllPosts,
  getUserName,
  authenticateUser,
  registerUser,
  toggleLikePost,
  updatePostCaption,
  createPost,
  deletePost,
  toggleFavPost,
  getAllFavPosts,
  toggleFollowUser,
  getAllFollowingUserPosts,
  searchPosts
  // createAvatar
};

export default logic;
