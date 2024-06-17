function editPost(id) {
  var posts = getAllPosts();
  var index = posts.findIndex(function (element) {
    return element.id === id;
  });

  localStorage.posts = JSON.stringify(posts);
}
