import registerUser from './registerUser.js';

registerUser("liliana", "daPonte", "lili@dpt.com", "lili", "123456789", "123456789", error => {
    if (error) {
        console.error(error)

        return
    }

    console.log('user registered')
})