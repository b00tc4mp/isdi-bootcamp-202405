import deletePost from './deletePost.js'

deletePost('samu', '1isteie3c2gw', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post deleted')
})