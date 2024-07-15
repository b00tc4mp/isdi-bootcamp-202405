import findUser from "./findUser.js"

const matif = findUser(user => user.username === "matif")

console.log(matif)