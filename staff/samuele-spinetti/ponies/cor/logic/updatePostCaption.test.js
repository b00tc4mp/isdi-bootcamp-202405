import updatePostCaption from './updatePostCaption.js'

updatePostCaption('marti', 'kg6nl8j0imo', 'Hello, soy Marti', error => {
    if (error) {
        console.error(error)

        return
    }
})