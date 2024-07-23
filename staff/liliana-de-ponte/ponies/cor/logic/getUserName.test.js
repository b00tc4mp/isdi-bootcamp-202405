import getUserName from "./getUserName.js";

getUserName('lilideponte', 'manubarzi', (error, name) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(name)
})
