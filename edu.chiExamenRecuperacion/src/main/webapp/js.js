/**
 * 
 * 
 */

 
const arrayPalabra = []; // Array que guarda las palabras bien
const asterisco = []; // Array que guarda las palabras con *
let erroresN = 0; // Contador de errores
let intentosRestantes = 5; // Contador de intentos
const fallosN = []; // Array de letras falladas
let tiempoInicio = null; //Inicio el tiempo en null

function palabraElegir() {
    const palabra = prompt("Introducir palabra").toLowerCase(); //Introduce la palabra y para compararla más facilmente la paso a minúscula.
    if (palabra.length > 10) { //Si la palabra tiene más de 10 digitos no deja que entre
        alert("No puede tener más de 10 dígitos la palabra");
        return;
    }
    document.getElementById('palabra').innerHTML = '*'.repeat(palabra.length); // Muestra asteriscos en el lugar de la palabra para ir cambiando mediante se van acertando.
    arrayPalabra.push(...palabra.split('')); // Divide la palabra en letras y las guarda en el array
    asterisco.push(...Array(palabra.length).fill('*')); // Llena el array de asteriscos
    erroresN = 0; // Inicia el contador de errores
    intentosRestantes = 5; // Inicia los intentos restantes
    document.getElementById('intentos').innerHTML = `Intentos restantes: ${intentosRestantes}`; // Actualiza el contador de intentos
    tiempoInicio = Date.now(); // Marca el tiempo de inicio
}

function adivinarLetra() {
    const letra = prompt("Letra").toLowerCase(); // Coge la letra que ponga el usuario.

    if (!letra || !/^[a-z]$/.test(letra)) { // Comprueba que sea una letra válida, si no lo es aparecerá un alert
        alert("Introduce una letra válida.");
        return;
    }

    if (arrayPalabra.includes(letra)) { // Comprueba que la letra está en la palabra
        arrayPalabra.forEach((letraNueva, index) => {
            if (letraNueva === letra) {
                asterisco[index] = letra; // Cambia los asteriscos con la letra puesta por el usuario.
            }
        });
    } else {
        if (!fallosN.includes(letra)) { //Comprueba las letras que no tiene
            fallosN.push(letra); // Añade la letra a los fallos
            erroresN++; //Suma errores
            intentosRestantes--; //Baja Intentos
            document.getElementById('intentos').innerHTML = `Intentos: ${intentosRestantes}`;
            document.getElementById('fallos').innerHTML = `Letras falladas: ${fallosN.join(' ')}`;
        }
    }

    document.getElementById('palabra').innerHTML = asterisco.join('');

    if (!asterisco.includes('*')) { // Si no hay más asteriscos, se ha acertado la palabra.
        const tiempoFin = Date.now(); //Coge la fecha cuando se acierta
        const tiempoRespuesta = ((tiempoFin - tiempoInicio) / 1000).toFixed(2); // Calcula el tiempo en segundos
        document.getElementById('mensaje').innerHTML = `Muy bien, la palabra era ... ${arrayPalabra.join('')}`;
        document.getElementById('fin').innerHTML += `<p>La palabra era: ${arrayPalabra.join('')}, has tenido: ${erroresN} errores</p>`;
        document.getElementById('tiempo').innerHTML += `<p>has tardado...: ${tiempoRespuesta} segundos</p>`;
        reiniciarJuego();
    }

    if (intentosRestantes === 0) { // Si no hay más intentos, se ha perdido el juego
        document.getElementById('mensaje').innerHTML = `¡Has perdido! La palabra era... ${arrayPalabra.join('')}`;
        document.getElementById('fin').innerHTML += `<p>La palabra era: ${arrayPalabra.join('')}, has tenido ${erroresN} errores</p>`;
        reiniciarJuego();
    }

    mostrarMensaje();
}

function mostrarMensaje() { // Muestra mensajes según los errores del usuario.
    let mensaje = '';
    if (intentosRestantes > 0) {
        if (erroresN < 1) {
            mensaje = 'Magnífico';
        } else if (erroresN < 3) {
            mensaje = 'Bien';
        } else if (erroresN < 5) {
            mensaje = 'Por poco';
        }
    } else {
        mensaje = 'Has perdido';
    }
    document.getElementById('mensaje').innerHTML = mensaje;
}

function reiniciarJuego() { // Reinicia el juego para una nueva palabra.
    arrayPalabra.length = 0;
    asterisco.length = 0;
    fallosN.length = 0;
    erroresN = 0;
    intentosRestantes = 5;
    tiempoInicio = null;
}
