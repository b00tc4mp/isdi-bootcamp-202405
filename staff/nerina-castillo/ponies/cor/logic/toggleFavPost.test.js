import toggleFavPost from "./toggleFavPost.js";

toggleFavPost('cauliFlower', 'iz8vnuu9xxk', (error) => {
    if(error) {
        console.error(error)

        return
    }

    console.log('post saved')
})