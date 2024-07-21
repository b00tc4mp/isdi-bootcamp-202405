import getUserName from "./getUserName.js";

getUserName('julitoCamelas', 'cauliFlower',  (error, user) => {
    if(error) {
        console.error(error)

        return
    }
console.log(user)

})
