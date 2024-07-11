import fs from 'fs';

function findUsers(condition) {
    let json = fs.readFileSync('./data/users.json', 'utf8');

    const users = json ? JSON.parse(json) : [];

    const foundUsers = users.filter(condition);

    return foundUsers || null;
}

export default findUsers;