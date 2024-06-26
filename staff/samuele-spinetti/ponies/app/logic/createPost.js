{
    const createPost = (image, caption) => {
        if (!image.startsWith('http'))
            throw new Error('invalid image')

        const posts = localStorage.posts !== undefined ? JSON.parse(localStorage.posts) : []

        const post = {
            id: generateId(),
            image: image,
            caption: caption,
            author: sessionStorage.username,
            date: new Date().toISOString(),
        }

        posts.push(post)

        localStorage.posts = JSON.stringify(posts)
    }

    logic.createPost = createPost
}