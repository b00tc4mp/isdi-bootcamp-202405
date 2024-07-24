import getUserName from './getUserName.js'

const name = getUserName('Cacatua', 'Cacatua', (error, name) => {
    if (error) {
        console.error(error)

        return
    }

    console.log(name)
})

console.log(name)