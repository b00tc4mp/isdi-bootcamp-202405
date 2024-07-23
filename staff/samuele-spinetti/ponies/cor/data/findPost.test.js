import findPost from './findPost.js'

findPost(post => post.id === 'abcdefghi', (error, post) => {
    if (error) {
        console.error(error)

        return
    }

    console.log('Post found', post)
})
