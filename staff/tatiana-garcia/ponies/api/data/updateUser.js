import fs from 'fs'

function updateUser(condition, user) {
    let json = fs.readFileSync("./data/users.json", "utf-8")

    const users = json ? JSON.parse(json) : []

    const index = users.findIndex(condition)

    if (index > -1) {

        users.splice(index, 1, user)

        json = JSON.stringify(users)

        fs.writeFileSync("./data/users.json", json)
    }
}

export default updateUser