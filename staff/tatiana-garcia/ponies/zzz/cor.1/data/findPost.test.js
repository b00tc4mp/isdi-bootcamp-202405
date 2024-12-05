import findPost from './findPost.js';

findPost(post => post.id === 'k03nwelhvls', (error, post) => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post found', post)
})

