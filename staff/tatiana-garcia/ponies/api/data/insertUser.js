import fs from 'fs'

function insertUser(user) {
    let json = fs.readFileSync("./data/users.json", "utf-8")

    const users = json ? JSON.parse(json) : []

    users.push(user)

    json = JSON.stringify(users)

    fs.writeFileSync("./data/users.json", json)

}

export default insertUser

