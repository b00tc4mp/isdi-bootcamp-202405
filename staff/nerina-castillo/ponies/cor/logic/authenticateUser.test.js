import authenticateUser from "./authenticateUser.js";

authenticateUser('maxPower', 'maxpower1', error => {
    if(error) {
        console.error(error)

        return
    }

    console.log('user authenticated')
})