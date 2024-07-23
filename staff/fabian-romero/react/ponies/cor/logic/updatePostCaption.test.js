import updatePostCaption from './updatePostCaption.js'

updatePostCaption("Valito", "mi8drcuyseo", "New Caption para mi post", error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('new caption')
})