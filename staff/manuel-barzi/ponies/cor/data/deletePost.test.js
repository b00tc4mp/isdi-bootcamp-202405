import deletePost from './deletePost.js'

deletePost(post => post.id === 'pmof8l1ly8g', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post deleted')
})