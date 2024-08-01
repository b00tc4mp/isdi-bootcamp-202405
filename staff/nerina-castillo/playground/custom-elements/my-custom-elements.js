class HelloWorld extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const h1 = document.createElement("h1");

    h1.innerText = "Hello, World!";

    this.appendChild(h1);

    h1.style.backgroundColor = "red";
  }
}

window.customElements.define("hello-world", HelloWorld);

class HelloTo extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const h1 = document.createElement("h1");
    const name = this.getAttribute("name");
    h1.innerText = `Hello, ${name}!`;
    this.appendChild(h1);

    h1.style.backgroundColor = "yellowgreen";
  }
}

window.customElements.define("hello-to", HelloTo);

class Logo extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const container = document.createElement("div");
    container.classList = "logo-container";

    const logo = document.createElement("img");
    logo.src =
      "url(https://www.google.com/imgres?q=pony%20vector&imgurl=https%3A%2F%2Fimg.freepik.com%2Fvector-gratis%2Filustracion-silueta-unicornio-diseno-plano_23-2149460420.jpg&imgrefurl=https%3A%2F%2Fwww.freepik.es%2Ffotos-vectores-gratis%2Flittle-pony&docid=QJ-iZG2Kq-AlkM&tbnid=pru1vcTdn8JJGM&vet=12ahUKEwjb5aSHoeiGAxWMxQIHHSBuAGkQM3oECGIQAA..i&w=626&h=626&hcb=2&ved=2ahUKEwjb5aSHoeiGAxWMxQIHHSBuAGkQM3oECGIQAA)";
    logo.alt = "Ponies logo";

    container.appendChild(logo);
    this.appendChild(container);

    logo.style.width = "100px";
    logo.style.height = "100px";
  }
}

window.customElements.define("logo-ponies", Logo);

class CoolClock extends HTMLElement {
  constructor() {
    console.info("CoolClock -> constructor");
    super();
  }

  connectedCallback() {
    console.log("CoolClock -> connectedCallback");

    this.style.fontFamily = "Monaco";
    this.style.fontSize = "24px";
    this.style.dipslay = "block";

    const self = this;

    setInterval(function () {
      const now = new Date().toLocaleTimeString();
      self.innerText = now;

      const alarm = self.getAttribute("alarm");

      if (now >= alarm) self.style.backgroundColor = "red";
    }, 1000);
  }
}

window.customElements.define("cool-clock", CoolClock);
