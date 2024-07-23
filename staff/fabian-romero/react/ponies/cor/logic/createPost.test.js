import createPost from './createPost.js'

createPost('Valito', 'https://media.tenor.com/fi5OFMCehkMAAAAM/frenchie-yawn.gif', 'zZzZ...', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post created')
})