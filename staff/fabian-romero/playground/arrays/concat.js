console.log('TEST concat in Arrays')


console.log('CASE concat elements from two arrays')

// une las propiedades de las 2 variables. consu function concat.

var colors = ['rosa', 'rojo', 'azul']
var colors2 = ['verde', 'oro', 'cielo']

console.log(colors)
console.log(colors2)

var colors3 = colors.concat(colors2) // creo una nueva variable que tenga la propiedad de variable 1 + punto + (variable 2)

console.log(colors3) // hago correr la variable y el resultado es la union de esas 2 nuevas variables en una nueva.



console.log('CASE concat elements from 5 arrays')

// los mismo que arriba, une todos los elementos en una nueva variable


var colors = ['rosa', 'rojo']
var colors1 = ['verde', 'azul']
var colors2 = ['oro', 'cielo']
var colors3 = ['angel', 'demonio']
var colors4 = ['-paz']

var colors5 = colors.concat(colors1, colors2, colors3, colors4) // misma formula cuidado que en el () los elementos van separados por una "","" y no por un "".""

console.log(colors5) // hago correr la consola y me enseña ya todo junto