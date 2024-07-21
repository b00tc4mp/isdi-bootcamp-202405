import registerUser from "./registerUser.js";

registerUser('janfry', 'topera', 'janfry@topera.com', 'janfryTopera', 'janfrytopera1', 'janfrytopera1', error => {
    if(error) {
        console.error(error)

        return
    }

    console.log('user registered')
})
