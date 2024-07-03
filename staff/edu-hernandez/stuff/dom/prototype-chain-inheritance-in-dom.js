document.__proto__
// HTMLDocument {Symbol(Symbol.toStringTag): 'HTMLDocument', onreadystatechange: undefined, onmouseenter: undefined, onmouseleave: undefined}
document.__proto__.__proto__
// Document {…}
document.__proto__.__proto__.__proto__
// Node {…}
document.__proto__.__proto__.__proto__.__proto__
// EventTarget {Symbol(Symbol.toStringTag): 'EventTarget', addEventListener: ƒ, dispatchEvent: ƒ, removeEventListener: ƒ}
document.__proto__.__proto__.__proto__.__proto__.__proto__
// {__defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, __lookupSetter__: ƒ, …}
document.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__
// null



document.body.__proto__
// HTMLBodyElement {…}
document.body.__proto__.__proto__
// HTMLElement {…}
document.body.__proto__.__proto__.__proto__
// Element {…}
document.body.__proto__.__proto__.__proto__.__proto__
// Node {…}
document.body.__proto__.__proto__.__proto__.__proto__.__proto__
// EventTarget {Symbol(Symbol.toStringTag): 'EventTarget', addEventListener: ƒ, dispatchEvent: ƒ, removeEventListener: ƒ}
document.body.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__
// {__defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, __lookupSetter__: ƒ, …}
document.body.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__
// null



var main = document.body.children[0]
// undefined
main
//<main class=​"view">​…​</main>​
main.__proto__
// HTMLElement {…}
main.__proto__.__proto__
// Element {…}
main.__proto__.__proto__.__proto__
// Node {…}
main.__proto__.__proto__.__proto__.__proto__
// EventTarget {Symbol(Symbol.toStringTag): 'EventTarget', addEventListener: ƒ, dispatchEvent: ƒ, removeEventListener: ƒ}
main.__proto__.__proto__.__proto__.__proto__.__proto__
// {__defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, __lookupSetter__: ƒ, …}
main.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__
// null



var h1 = main.children[0]
// undefined
h1
//<h1>​Register​</h1>​
h1.__proto__
// HTMLHeadingElement {Symbol(Symbol.toStringTag): 'HTMLHeadingElement', onmouseenter: undefined, onmouseleave: undefined}
h1.__proto__.__proto__
// HTMLElement {…}
h1.__proto__.__proto__.__proto__
// Element {…}
h1.__proto__.__proto__.__proto__.__proto__
// Node {…}
h1.__proto__.__proto__.__proto__.__proto__.__proto__
// EventTarget {Symbol(Symbol.toStringTag): 'EventTarget', addEventListener: ƒ, dispatchEvent: ƒ, removeEventListener: ƒ}
h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__
// {__defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, __lookupSetter__: ƒ, …}
h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__
// null


var form = main.children[1]
// undefined
form
//<form class=​"form">​…​</form>​
form.__proto__
// HTMLFormElement {…}
form.__proto__.__proto__
// HTMLElement {…}
form.__proto__.__proto__.__proto__
// Element {…}
form.__proto__.__proto__.__proto__.__proto__
// Node {…}
form.__proto__.__proto__.__proto__.__proto__.__proto__
// EventTarget {Symbol(Symbol.toStringTag): 'EventTarget', addEventListener: ƒ, dispatchEvent: ƒ, removeEventListener: ƒ}
form.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__
// {__defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, __lookupSetter__: ƒ, …}
form.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__
// null


var a = main.children[2]
// undefined
a
//<a href>​Login​</a>​
a.__proto__
// HTMLAnchorElement {…}
a.__proto__.__proto__
// HTMLElement {…}
a.__proto__.__proto__.__proto__
// Element {…}
a.__proto__.__proto__.__proto__.__proto__
// Node {…}
a.__proto__.__proto__.__proto__.__proto__.__proto__
//EventTarget {Symbol(Symbol.toStringTag): 'EventTarget', addEventListener: ƒ, dispatchEvent: ƒ, removeEventListener: ƒ
a.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__
// {__defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, __lookupSetter__: ƒ, …}
a.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__
// null


/*
        [Object]
            ↑
        [EventTarget]
            ↑
        [Node]
    ↑               ↑
[Document]      [Element]
    ↑               ↑
[HTMLDocument]  [HTMLElement]
                    ↑                                      
                [HTMLBodyElement] [HTMLHeadingElement] [HTMLFormElement] [HTMLAnchorElement] ...
*/

// and svg?

document
//#document...
document.__proto__
// XMLDocument {Symbol(Symbol.toStringTag): 'XMLDocument', onreadystatechange: undefined, onmouseenter: undefined, onmouseleave: undefined}
document.__proto__.__proto__
// Document {…}
document.__proto__.__proto__.__proto__
// Node {…}
document.__proto__.__proto__.__proto__.__proto__
// EventTarget {Symbol(Symbol.toStringTag): 'EventTarget', addEventListener: ƒ, dispatchEvent: ƒ, removeEventListener: ƒ}
document.__proto__.__proto__.__proto__.__proto__.__proto__
// {__defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, __lookupSetter__: ƒ, …}
document.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__
// null

var svg = document.querySelector('svg')
// undefined
svg.__proto__
// SVGSVGElement {…}
svg.__proto__.__proto__
// SVGGraphicsElement {…}
svg.__proto__.__proto__.__proto__
// SVGElement {…}
svg.__proto__.__proto__.__proto__.__proto__
// Element {…}
svg.__proto__.__proto__.__proto__.__proto__.__proto__
// Node {…}
svg.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__
// EventTarget {Symbol(Symbol.toStringTag): 'EventTarget', addEventListener: ƒ, dispatchEvent: ƒ, removeEventListener: ƒ}
svg.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__
// {__defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, __lookupSetter__: ƒ, …}
svg.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__
// null

// ...