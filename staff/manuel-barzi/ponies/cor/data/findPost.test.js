import findPost from './findPost.js'

findPost(post => post.id === 'pmof8l1ly8g', (error, post) => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post found', post)
})