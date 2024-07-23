import getUserName from './getUserName.js';

const user = getUserName("tatig", "abtg", (error, name) => {
    if (error) {
        console.error(error)

        return
    }
    console.log(name)
})
