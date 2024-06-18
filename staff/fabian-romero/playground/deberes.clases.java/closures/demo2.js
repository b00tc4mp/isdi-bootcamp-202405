
function saludo(nombre) {
    var mensaje = 'Hola, ' + nombre  // este es el mensaje que siempre se va a devolver cuando llamemos a la funcion saludo()

    return function () {
        console.log(mensaje); // lo que espero que me retorne es el mensaje
    };
}

var saludar2 = saludo('Mundo');
saludar2();

var saludar3 = saludo('cucaracho');
saludar3()

var saludar4 = saludo('peter-pan')
saludar4()

// es una funcion dentro de una funcion // por más que la funcion saludar ya se haya ejecutado, cada vez que la llame la recordará
