import findUser from './findUser.js';


const max = findUser(user => user.username === 'maxPower');

console.log(max);