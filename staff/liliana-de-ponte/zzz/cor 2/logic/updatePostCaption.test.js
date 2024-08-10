import updatePostCaption from "./updatePostCaption.js";


updatePostCaption('lilideponte', 'bq3iooz0vc8', 'Funciona', error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('post caption updated')
})