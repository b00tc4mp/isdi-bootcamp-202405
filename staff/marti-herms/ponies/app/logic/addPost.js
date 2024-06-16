function addPost(img, caption) {
    if (!img.startsWith('http')) {
        throw new Error('invalidImage');
    }
    var posts = getAllPosts();

    var date = new Date().toString();
    var rdmNum = (Math.random() * 100).toString();
    var id = rdmNum + date;

    var post = { id: id, img: img, caption: caption, author: sessionStorage.username, date: new Date().toISOString() }
    posts.unshift(post);

    setAllPosts(posts);

    addPostButton.disabled = false;
}