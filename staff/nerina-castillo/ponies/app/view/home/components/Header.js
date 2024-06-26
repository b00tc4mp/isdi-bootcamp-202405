class Header extends Component {
  constructor() {
    super(document.createElement("header"));

    this.container.className = "header";

    const logo = new Heading(1);
    logo.setClassName("logo");
    logo.setText("Ponies");
    this.add(logo);

    const userName = new Paragraph();
    userName.setClassName("header__user-name");
    this.add(userName);

    try {
      const name = logic.getUserName();

      userName.setText(`Hello ${name}!`);
    } catch (error) {
      alert(error.message);
    }

    const logoutButton = new Button();
    logoutButton.setClassName("logout-button");
    logoutButton.setText("Logout");
    this.add(logoutButton);

    logoutButton.onClick(() => {
      try {
        logic.logoutUser();

        location.href = "../login";
      } catch (error) {
        alert(error.message);
      }
    });
  }
}
