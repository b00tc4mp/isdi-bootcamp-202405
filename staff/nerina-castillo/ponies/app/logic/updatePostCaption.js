import data from "../data/index";
import validate from "../validate";

const updatePostCaption = (postId, newCaption) => {
  validate.postId(postId, 'postId')
  validate.string(newCaption, 'newCaption')
  if (postId.trim().length === 0) throw new Error("invalid postId");

  const post = data.findPost((post) => post.id === postId);

  if (post === null) throw new Error("post not found");

  post.caption = newCaption;

  data.updatePost((post) => post.id === postId, post);
};

export default updatePostCaption;
