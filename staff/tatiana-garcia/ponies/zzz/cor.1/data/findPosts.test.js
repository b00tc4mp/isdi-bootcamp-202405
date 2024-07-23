import findPosts from './findPosts.js'

const posts = findPosts(() => true, (error, posts) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(posts)
})