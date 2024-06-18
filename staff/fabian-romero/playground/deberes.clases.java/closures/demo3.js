function contadorPro() { // fuincion principal 
    var contador = 0;

    return function () { // cada vez que llame a la funcion se sumara 1
        contador++;
        return contador;
    };
}

const contar = contadorPro(); // voy llamando uno a uno y se aumenta

console.log(contar())
console.log(contar())
console.log(contar())
console.log(contar())

console.log(contar())
console.log(contar())
console.log(contar()) // la funcion queda registrada ya en la "memoria" y se puede ejecutar cada vez que se llame



