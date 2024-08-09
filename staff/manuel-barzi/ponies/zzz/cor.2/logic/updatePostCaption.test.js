import updatePostCaption from './updatePostCaption.js'

updatePostCaption('samu', '1ksy8z2bdn6o', 'Hello, soy Samu', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post caption updated')
})