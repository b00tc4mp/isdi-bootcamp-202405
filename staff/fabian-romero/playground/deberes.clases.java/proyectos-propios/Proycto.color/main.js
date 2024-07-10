// seleccionar los elementos del DOM

const boton = document.querySelector('button'); // llamamos del html el primero con esta etiqueta
const color = document.getElementById('color'); // llamamos a los componentes por su ID nombre

function getColorHexRandom() {
    let digits = '0123456789ABCDEF';
    let colorHex = '#'

    for (let i = 0; i < 6; i++) {// usamos i < 6 porque los numeros/color estan compuestos por 6 digitos
        let numberRandom = Math.floor(Math.random() * 16) // random para que me de numeros x del 1 al 10 y luego multiplicarlo por 16 que son las opciones que tenemos entre numeros y letras. luego de esto tb usamos math floor que es para redondear numeros en caso de decimal
        colorHex += digits[numberRandom]
    }

    return colorHex
}

boton.addEventListener('click', function () { // hacemos una funcion / para actualizar el fondo y el texto
    let colorRandome = getColorHexRandom(); // declaramos una variable y le decimos de hacer una funcion
    color.textoContent = colorRandome; // dentro de "la carpeta" color le decimos que cuanod se haga la funcion se copie alli
    document.body.style.backgroundColor = colorRandome // y ese resultado se copie dentro de la carpeta bck/style/body/document
});
