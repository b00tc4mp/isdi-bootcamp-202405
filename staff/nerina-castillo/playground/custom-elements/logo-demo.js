class Logo extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const container = document.createElement("div");
    container.classList = "logo-container";

    const logo = document.createElement("img");
    logo.src =
      "https://www.google.com/imgres?q=pony%20vector&imgurl=https%3A%2F%2Fimg.freepik.com%2Fvector-gratis%2Filustracion-silueta-unicornio-diseno-plano_23-2149460420.jpg&imgrefurl=https%3A%2F%2Fwww.freepik.es%2Ffotos-vectores-gratis%2Flittle-pony&docid=QJ-iZG2Kq-AlkM&tbnid=pru1vcTdn8JJGM&vet=12ahUKEwjb5aSHoeiGAxWMxQIHHSBuAGkQM3oECGIQAA..i&w=626&h=626&hcb=2&ved=2ahUKEwjb5aSHoeiGAxWMxQIHHSBuAGkQM3oECGIQAA";
    logo.alt = "Ponies logo";

    container.appendChild(logo);
    this.appendChild(container);

    logo.style.width = "100px";
    logo.style.height = "100px";
  }
}

window.customElements.define("logo-ponies", Logo);
