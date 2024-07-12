import data from "../data/index.js";

import validate from "../validate.js";

const email_regex = /^[a-z0-9._]+@[a-z0-9.-]{3,63}\.[a-z]{2,10}$/;
const name_regex = /^(?!.*\s{2})[a-zA-Z ]{3,16}$/;
const user_regex = /^(?!.*\s{2})[a-zA-Z0-9._-]{4,16}$/;

const registerUser = (
  name,
  surname,
  email,
  username,
  password,
  passwordRepeat
) => {
  validate.name(name)
  validate.surname(surname)
  validate.email(email)
  validate.username(username)
  validate.password(password)
  validate.passwordRepeat(passwordRepeat)

  if (!name_regex.test(name.trim())) throw new Error("invalid name");

  if (!name_regex.test(surname.trim())) throw new Error("ivalid surname");

  if (!email_regex.test(email)) throw new Error("invalid email");

  if (!user_regex.test(username)) throw new Error("invalid username");

  if (password.trim().length < 8) throw new Error("invalid password");

  if (password !== passwordRepeat) throw new Error("passwords do not match");

  let user = data.findUser((user) => user.email === email);

  if (user !== null) throw new Error("email already exists");

  user = data.findUser((user) => user.username === username);

  if (user !== null) throw new Error("username already exists");

  user = {
    name: name,
    surname: surname,
    email: email,
    username: username,
    password: password,
    favs: [],
    following: [],
    avatar: 'https://c8.alamy.com/comp/2EDB67T/cute-horse-avatar-cute-farm-animal-hand-drawn-illustration-isolated-vector-illustration-2EDB67T.jpg'
  }

  data.insertUser(user);
};

export default registerUser;
