import fs from 'fs'

function findUser(condition) {
    let json = fs.readFileSync("./data/users.json", 'utf-8')

    const users = json ? JSON.parse(json) : []

    const user = users.find(condition)

    return user || null

}

export default findUser
