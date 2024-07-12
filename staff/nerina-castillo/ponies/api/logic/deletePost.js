import data from "../data/index.js";

import validate from "../validate.js";

const deletePost = (username, postId) => {
  validate.username(username)
  validate.postId(postId, 'postId')

  const user = data.findUser(user => user.username === username)
  if (user === null)
    throw new Error('User not found')

  if (postId.trim().length === 0) throw new Error("invalid postId");

  const post = data.findPost((post) => post.id === postId);

  if (post === null) throw new Error("post not found");

  data.deletePost((post) => post.id === postId);
};

export default deletePost;
