import findUser from "./findUser.js";

const liliana = findUser(user => user.username === 'lilideponte')
const samuele = findUser(user => user.username === 'samuelespinetti')
const lucas = findUser(user => user.username === 'lucas')
const tatiana = findUser(user => user.username === 'tatianagarcia')


console.log(liliana)
console.log(samuele)
console.log(lucas)
console.log(tatiana)