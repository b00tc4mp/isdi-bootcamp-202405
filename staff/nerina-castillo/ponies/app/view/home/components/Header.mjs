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
    homeButton.addClassName("Button--active");
    this.add(homeButton);

    homeButton.onClick(() => {
      homeButton.addClassName("Button--active");

      followsButton.removeClassName("Button--active");
      favsButton.removeClassName("Button--active");

      self.onHomeClickCallback();
    });

    const followsButton = new Button();
    followsButton.setText("Following");
    this.add(followsButton);

    followsButton.onClick(() => {
      followsButton.addClassName("Button--active");

      homeButton.removeClassName("Button--active");
      favsButton.removeClassName("Button--active");

      self.onFollowsClickCallback();
    });

    const favsButton = new Button();
    favsButton.setText("💫");
    this.add(favsButton);

    favsButton.onClick(() => {
      favsButton.addClassName("Button--active");

      homeButton.removeClassName("Button--active");
      followsButton.removeClassName("Button--active");

      self.onFavsClickCallback();
    });

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
