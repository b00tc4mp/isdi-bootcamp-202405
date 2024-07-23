import registerUser from "./registerUser.js";

registerUser("Cara", "Papa", "cara@papa.com", "carapapa", "123456789", "123456789", error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('user registered')
})