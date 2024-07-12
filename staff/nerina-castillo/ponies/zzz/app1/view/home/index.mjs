import Component from "../Component.js";
import Header from "./components/Header.js";
import PostList from "./components/PostList.js";
import FavPostList from "./components/FavPostList.js";
import FollowingPostList from "./components/FollowingPostList.js";
import Footer from "./components/Footer.js";

const home = new Component(document.body);
const header = new Header();
home.add(header);

header.onHomeClick(() => {
  if (favPostList && body.has(favPostList)) {
    body.remove(favPostList);
    body.add(postList);

    postList.clearPosts();
    postList.listPosts();
  } else if (followingPostList && body.has(followingPostList)) {
    body.remove(followingPostList);
    body.add(postList);

    postList.clearPosts();
    postList.listPosts();
  }
});

let favPostList;

header.onFavsClick(() => {
  if (body.has(postList)) {
    body.remove(postList);

    favPostList = new FavPostList();
    body.add(favPostList);
  } else if (followingPostList && body.has(followingPostList)) {
    body.remove(followingPostList);
  }

  if (!favPostList) {
    favPostList = new FavPostList();
  }
  body.add(favPostList);

  favPostList.clearPosts();
  favPostList.listPosts();
});

let followingPostList;

header.onFollowsClick(() => {
  if (body.has(postList)) {
    body.remove(postList);

    followingPostList = new FollowingPostList();
    body.add(followingPostList);

    followingPostList.listPosts();
  } else if (favPostList && body.has(favPostList)) {
    body.remove(favPostList);
  }
  if (!followingPostList) {
    favPostList = new FollowingPostList();
  }
  body.add(followingPostList);

  followingPostList.clearPosts();
  followingPostList.listPosts();
});

const body = new Component(document.createElement("main"));
body.setClassName("view main");
home.add(body);

const postList = new PostList();
body.add(postList);

postList.listPosts();

const footer = new Footer();
home.add(footer);

footer.onPostCreated(() => {
  postList.clearPosts();
  postList.listPosts();
});
