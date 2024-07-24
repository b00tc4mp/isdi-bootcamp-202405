import updatePostCaption from './updatePostCaption.js'

updatePostCaption('Petazeta', '2gouhl5uylg', 'ponita marica', error => {
    if (error) {
        console.error(error)

        return
    }
})