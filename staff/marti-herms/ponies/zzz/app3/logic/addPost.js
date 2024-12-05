function addPost(img, caption) {
    if (!img.startsWith('http')) {
        throw new Error('invalidImage');
    }
    var posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : [];

    var post = {
        id: generateId(),
        img: img,
        caption: caption,
        author: sessionStorage.username,
        date: new Date().toISOString()
    };

    posts.unshift(post);

    localStorage.posts = JSON.stringify(posts);
}