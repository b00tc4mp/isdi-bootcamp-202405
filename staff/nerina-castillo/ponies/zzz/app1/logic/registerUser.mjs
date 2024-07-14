import data from "../data/index.js";

const EMAIL_REGEX = /^[a-z0-9._]+@[a-z0-9.-]{3,63}\.[a-z]{2,10}$/;
const NAME_REGEX = /^(?!.*\s{2})[a-zA-Z ]{3,16}$/;
const USER_REGEX = /^(?!.*\s{2})[a-zA-Z0-9._-]{4,16}$/;

const registerUser = (
  name,
  surname,
  email,
  username,
  password,
  passwordRepeat
) => {
  if (!NAME_REGEX.test(name.trim())) throw new Error("invalid name");

  if (!NAME_REGEX.test(surname.trim())) throw new Error("ivalid surname");

  if (!EMAIL_REGEX.test(email)) throw new Error("invalid email");

  if (!USER_REGEX.test(username)) throw new Error("invalid username");

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
  };

  data.insertUser(user);
};

export default registerUser;
