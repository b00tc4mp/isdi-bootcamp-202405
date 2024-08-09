import getAllPosts from "./getAllPosts";
import getUserName from "./getUserName";
import getUserId from "./getUserId";
import loginUser from "./loginUser";
import logoutUser from "./logoutUser";
import registerUser from "./registerUser";
import toggleLikePost from "./toggleLikePost";
import updatePostCaption from "./updatePostCaption";
import createPost from "./createPost";
import deletePost from "./deletePost";
import toggleFavPost from "./toggleFavPost";
import getAllFavPosts from "./getAllFavPosts";
import toggleFollowUser from "./toggleFollowUser";
import getAllFollowingUserPosts from "./getAllFollowingUserPosts";
import isUserLoggedIn from "./isUserLoggedIn";
import searchColors from "./searchColors";
import searchPosts from "./searchPosts";
// import createAvatar from "./createAvatar.js";

const logic = {
  getAllPosts,
  getUserName,
  getUserId,
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
  getAllFollowingUserPosts,
  isUserLoggedIn,
  searchColors,
  searchPosts
  // createAvatar
};

export default logic;
