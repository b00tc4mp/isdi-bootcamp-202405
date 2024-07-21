import updatePostCaption from "./updatePostCaption.js";

const post = updatePostCaption('maxPower', 'pnh3hr39ljk', 'yay', error => {
    if(error) {
        console.error(error)

        return
    }

    console.log('caption updated')
})