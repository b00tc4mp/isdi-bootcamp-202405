import getUser from './getUser.js'

getUser("maxPower", (error, user) => {
    if(error) {
        console.error(error)

        return
    }

console.log(user)

})
