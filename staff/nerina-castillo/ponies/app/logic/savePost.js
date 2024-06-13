function savePost(imageSource, description) {
  var post = {
    src: imageSource,
    description: description,
  };

  localStorage.posts = JSON.stringify(post);
}
