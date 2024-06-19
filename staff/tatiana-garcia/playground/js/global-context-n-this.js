window
// Window { window: Window, self: Window, document: document, name: '', location: Location, … }
this
// Window { window: Window, self: Window, document: document, name: '', location: Location, … }
window === this
// true
window.console
// console { debug: ƒ, error: ƒ, info: ƒ, log: ƒ, warn: ƒ, … }
this.console
// console { debug: ƒ, error: ƒ, info: ƒ, log: ƒ, warn: ƒ, … }
console
// console { debug: ƒ, error: ƒ, info: ƒ, log: ƒ, warn: ƒ, … }
window.console === this.console
// true
this.console === console
// true