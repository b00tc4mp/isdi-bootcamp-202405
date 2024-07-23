import getUserName from './getUserName.js'

const user = getUserName('samu', 'marti', (error, name) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(name)
})