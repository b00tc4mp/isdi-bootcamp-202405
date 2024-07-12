import data from "../data/index";

const getAllFollowingUserPosts = () => {
  const user = data.findUser(
    (user) => user.username === sessionStorage.username
  );

  if (user === null) throw new Error("user not found");

  const posts = data.findPosts((post) => user.following.includes(post.author));

  posts.forEach((post) => {
    post.fav = user.favs.includes(post.id);
    post.like = post.likes.includes(sessionStorage.username);

    const author = data.findUser(user => user.username === post.author)

    post.author = {
      username: post.author,
      avatar: author.avatar,
      following: user.following.includes(post.author)
  }
  });

  return posts.reverse();
};

export default getAllFollowingUserPosts;
