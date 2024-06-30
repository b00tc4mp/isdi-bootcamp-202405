import Component from "../../Component.mjs";
import Paragraph from "../../components/Paragraph.mjs";
import Button from "../../components/Button.mjs";
// import Heading from "../../components/Heading.mjs";

import logic from "../../../logic/index.mjs";

class Header extends Component {
  constructor() {
    super(document.createElement("header"));
    this.setClassName("header");

    // const logo = new Heading(1);
    // logo.setClassName("logo");
    // logo.setText("Ponies");
    // this.add(logo);

    const userName = new Paragraph();
    userName.setClassName("header__user-name");
    this.add(userName);

    try {
      const name = logic.getUserName();

      userName.setText("Hello, " + name + "!");
    } catch (error) {
      console.error(error);

      alert(error.message);
    }

    const self = this;

    const homeButton = new Button();
    homeButton.setText("🏚️");
    homeButton.setClassName("home-button");
    this.add(homeButton);

    homeButton.onClick(() => self.onHomeClickCallback());

    const followsButton = new Button();
    followsButton.setText("Following");
    followsButton.setClassName("follow-button");
    this.add(followsButton);

    followsButton.onClick(() => self.onFollowsClickCallback());

    const favsButton = new Button();
    favsButton.setText("💫");
    favsButton.setClassName("fav-button");
    this.add(favsButton);

    favsButton.onClick(() => self.onFavsClickCallback());

    const logoutButton = new Button();
    logoutButton.setClassName("logout-button");
    logoutButton.setText("Logout");
    this.add(logoutButton);

    logoutButton.onClick(() => {
      try {
        logic.logoutUser();

        location.href = "../login";
      } catch (error) {
        console.error(error);

        alert(error.message);
      }
    });
  }

  onHomeClick(callback) {
    this.onHomeClickCallback = callback;
  }

  onFavsClick(callback) {
    this.onFavsClickCallback = callback;
  }

  onFollowsClick(callback) {
    this.onFollowsClickCallback = callback;
  }
}

export default Header;
