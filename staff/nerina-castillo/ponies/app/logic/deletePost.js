import data from "../data/index";

import validate from "../validate.js";

const deletePost = (postId) => {
  validate.postId(postId, 'postId')
  if (postId.trim().length === 0) throw new Error("invalid postId");

  const post = data.findPost((post) => post.id === postId);

  if (post === null) throw new Error("post not found");

  data.deletePost((post) => post.id === postId);
};

export default deletePost;
