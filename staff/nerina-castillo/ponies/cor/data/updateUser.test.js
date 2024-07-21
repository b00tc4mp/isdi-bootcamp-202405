import updateUser from "./updateUser.js";

const julito = {
    name: 'julito',
    surname: 'camelas',
    email: 'julito@camelas.com',
    username: 'julitoCamelas',
    password: 'julito123',
    favs: [
        "13odod0tbx6"
    ],
    following: [
        "cauliFlower"
    ],
    avatar: "https://svgsilh.com/svg/145535-707070.svg"
}

updateUser(user=> user.username === 'maryFlower', julito, (error) => {
    if(error){
        console.error(error)

        return
    }

    console.log('user updated')
})

    