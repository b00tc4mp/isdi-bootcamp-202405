import findUser from './findUser.js';

const max =  {
name: "Max",
surname: "Power",
email: "max@power.com",
username: "maxPower",
password: "maxpower1",
favs: [],
following: [],
avatar: "https://svgsilh.com/svg/145535-707070.svg"
}


findUser(user => user.username === 'maxPower', (error, user) => {
    if(error) {
        console.error(error)

        return
    }

    console.log('user, found', user)
});
