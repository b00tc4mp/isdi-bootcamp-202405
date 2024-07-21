import deletePost from "./deletePost.js";

deletePost('cauliFlower', 'gnmn2fh2cko', error => {
    if(error) {
        console.error(error)

        return
    }

    console.log('post deleted')
})