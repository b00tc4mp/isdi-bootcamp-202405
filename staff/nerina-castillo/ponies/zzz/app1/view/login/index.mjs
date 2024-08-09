import Form from "../components/Form.js";
import Link from "../components/Link.js";

import logic from "../../logic/index.js";

const loginForm = new Form("form");

loginForm.onSubmit((event) => {
  event.preventDefault();

  const usernameInput = document.getElementById("username-input");
  const passwordInput = document.getElementById("password-input");

  const username = usernameInput.value;
  const password = passwordInput.value;

  try {
    logic.loginUser(username, password);

    location.href = "../home";
  } catch (error) {
    alert(error.message);
  }
});

const registerLink = new Link("a");

registerLink.onClick((event) => {
  event.preventDefault();

  location.href = "../register";
});
