import fs from 'fs'
import validate from '../validate.js';

function insertUser(user) {
  validate.object(user, 'user')

  let json = fs.readFileSync('./data/users.json', 'utf-8')
  
  const users = json ? JSON.parse(json) : [];

  users.push(user);

  json = JSON.stringify(users);

  fs.writeFileSync('./data/users.json', json)
}

export default insertUser;
