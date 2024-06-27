{
    const createPost = (image, caption) => {
        if (!image.startsWith('http'))
            throw new Error('invalid image')

        const post = {
            id: generateId(),
            image: image,
            caption: caption,
            author: sessionStorage.username,
            date: new Date().toISOString()
        }

        data.insertPost(post)
    }

    logic.createPost = createPost
}