function createPost(image, caption) {
    if (!image.startsWith('http'))
        throw new Error('invalid image')

    var posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : []

    var post = {
        id: generateId(),
        image: image,
        caption: caption,
        author: sessionStorage.username,
        date: new Date().toISOString(),
    }

    posts.push(post)

    localStorage.posts = JSON.stringify(posts)
}