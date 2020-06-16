/* Variables para guardar lo que ponen en los inputs*/
let nombreCompleto;
let usuario;
let correo;
let contraseña;
let contraseña2;

/* Variables para guardar las comunidades y los datos del json*/
let comunidadesaux = ["Andalucía", "Aragón", "Asturias", "Canarias", "Cantabria", "Castilla La Mancha", "Castilla León", "Catalunya", "Extremadura", "Galicia", "Islas Baleares", "La Rioja", "Madrid", "Murcia", "Navarra", "País Vasco", "Valencia"];
let datosJson;

let deporteElegido;

function listener() {

    /* Boton verde del paso 1*/
    let boton = document.getElementsByClassName("siguiente1")[0];
    boton.addEventListener("click", iniciarComprobantes);

    let selectComunidades = document.querySelectorAll(".comunidades")[0];
    selectComunidades.addEventListener("change", rellenarProvincias);

    let botonSiguiente = document.querySelectorAll(".siguiente2")[0];
    botonSiguiente.addEventListener("click", comprobarSiguiente);

    let deportes = document.querySelectorAll(".deporte");

    deportes.forEach(deporte => {
        deporte.addEventListener("click", fijarDiv);
    });

    let botonSiguiente2 = document.querySelectorAll(".siguiente3")[0];
    botonSiguiente2.addEventListener("click", pasoTres);

    let botonAtras = document.querySelectorAll(".roja")[0];
    botonAtras.addEventListener("click", function() {
        window.history.back();
    }, false);

}

function iniciarComprobantes() {

    /* Comprueba si han puesto bien los datos del fromulario*/

    let alertas = document.getElementsByClassName("alertas")[0];


    let comprobanteNombre = comprobarNombre();
    let comprobanteUsuario = comprobarUsuario();
    let comprobanteCorreo = comprobarCorreo();
    let comprobanteContraseña = comprobarContraseña();
    let comprobanteContraseñaRepetida = comprobarContraseñaRepetida();


    let nombre = document.getElementsByClassName("nombre")[0].value;
    let apellido = document.getElementsByClassName("apellido")[0].value;
    let usuario = document.getElementsByClassName("usuario")[0].value;
    let correo = document.getElementsByClassName("correo")[0].value;
    let contraseña = document.getElementsByClassName("contraseña")[0].value;
    let contraseña2 = document.getElementsByClassName("contraseña2")[0].value;

    if (nombre == "" || apellido == "" || usuario == "" || correo == "" || contraseña == "" || contraseña2 == "") {

        let alerta = document.createElement("div");
        alerta.classList.add("alert");
        alerta.classList.add("alert-danger");
        alerta.innerHTML = "Debes rellenar todos los campos";
        alertas.appendChild(alerta);

        let cruz = document.createElement("img");
        cruz.classList.add("cruz");
        cruz.src = "/img/cruz.png";
        cruz.width = "15";
        cruz.height = "15";
        alerta.appendChild(cruz);
        cruz.addEventListener("click", deleteAlerta);
    } else {
        if (!comprobanteCorreo) {

            let alerta = document.createElement("div");
            alerta.classList.add("alert");
            alerta.classList.add("alert-danger");
            alerta.innerHTML = "Has introducido mal el correo";
            alertas.appendChild(alerta);

            let cruz = document.createElement("img");
            cruz.classList.add("cruz");
            cruz.src = "/img/cruz.png";
            cruz.width = "15";
            cruz.height = "15";
            alerta.appendChild(cruz);

            cruz.addEventListener("click", deleteAlerta);

        }

        if (!comprobanteContraseña) {

            let alerta = document.createElement("div");
            alerta.classList.add("alert");
            alerta.classList.add("alert-danger");
            alerta.innerHTML = "La contraseña no cumple los requisitos";
            alertas.appendChild(alerta);

            let cruz = document.createElement("img");
            cruz.classList.add("cruz");
            cruz.src = "/img/cruz.png";
            cruz.width = "15";
            cruz.height = "15";
            alerta.appendChild(cruz);

            cruz.addEventListener("click", deleteAlerta);

        }

        if (!comprobanteContraseñaRepetida) {

            let alerta = document.createElement("div");
            alerta.classList.add("alert");
            alerta.classList.add("alert-danger");
            alerta.innerHTML = "Las contraseñas no coinciden";
            alertas.appendChild(alerta);

            let cruz = document.createElement("img");
            cruz.classList.add("cruz");
            cruz.src = "/img/cruz.png";
            cruz.width = "15";
            cruz.height = "15";
            alerta.appendChild(cruz);

            cruz.addEventListener("click", deleteAlerta);

        }


    }

    if (comprobanteNombre && comprobanteUsuario && comprobanteCorreo && comprobanteContraseña && comprobanteContraseñaRepetida) {
        //Si todo ha ido bien vamos al paso 2
        alPasoDos();

    }



}

function comprobarNombre() {
    let nombre = document.getElementsByClassName("nombre")[0].value;
    let apellido = document.getElementsByClassName("apellido")[0].value;
    nombreCompleto = nombre + " " + apellido;


    var comprobador = /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/.test(nombreCompleto);

    if (comprobador == true) {
        return true;
    } else {
        return false;

    }

}

function comprobarUsuario() {
    let usuario = document.getElementsByClassName("usuario")[0].value;
    return true;

}

function comprobarCorreo() {
    let correo = document.getElementsByClassName("correo")[0].value;
    var comprobador = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(correo);

    if (comprobador == true) {
        return true;
    } else {
        return false;
    }
}

function comprobarContraseña() {
    let contraseña = document.getElementsByClassName("contraseña")[0].value;
    var comprobador = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,40}$/.test(contraseña);

    if (comprobador == true) {
        return true;
    } else {
        return false;
    }
}

function comprobarContraseñaRepetida() {
    let contraseña = document.getElementsByClassName("contraseña")[0].value;
    let contraseña2 = document.getElementsByClassName("contraseña2")[0].value;
    var comprobador = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/.test(contraseña2);

    if (contraseña2 == contraseña) {
        return true;
    } else {
        return false;
    }
}


function alPasoDos() {

    /* Oculto el div del paso uno y muestro el paso 2 */

    let pasoUno = document.querySelectorAll(".paso1")[0];
    let pasoDos = document.querySelectorAll(".paso2")[0];

    pasoUno.classList.add("invisible");
    pasoDos.classList.remove("invisible");

}

//PASO DOS

function rellenarProvincias() {
    //Rellenar el select de comunidados gracias a los datos del JSON

    let selectProvincias = [];
    let comunidad = document.querySelectorAll(".comunidades")[0].value;
    selectProvincias = [];
    for (let i = 0; i < datosJson.length; i++) {
        if (datosJson[i].Comunidad == comunidad) {

            selectProvincias.push(datosJson[i].Provincia);


        }
    }

    var unique = selectProvincias.filter(onlyUnique);
    console.log(unique);


    addOptions("provincias", unique)

}
// Rutina para agregar opciones a un <select>
function addOptions(domElement, array) {

    var select = document.getElementsByName(domElement)[0];
    var length = select.options.length;
    for (i = length - 1; i >= 0; i--) {
        if (select.options[i].value != "Selecciona provincia") {
            select.options[i] = null;
        }

    }


    for (let i = 0; i < array.length; i++) {
        /* if (document.getElementsByName(domElement)[0] == "provinicas") {
             select.removeChild("option");
         }*/

        var option = document.createElement("option");
        option.text = array[i];
        select.add(option)

    }
}

function comprobarSiguiente() {
    let comunidades = document.getElementsByClassName("comunidades")[0];
    let provincia = document.getElementsByClassName("provincias")[0];


    if (comunidades.value == "Selecciona comunidad") {
        let alerta = "Debes seleccionar una comunidad";
        crearAlertas(alerta);
    } else if (provincia.value == "Selecciona provincia") {
        let alerta = "Debes seleccionar una provincia";
        crearAlertas(alerta);
    } else {
        alPasoTres();
    }

}

function alPasoTres() {

    /* Oculto el div del paso uno y muestro el paso 2 */

    let pasoDos = document.querySelectorAll(".paso2")[0];
    let pasoTres = document.querySelectorAll(".paso3")[0];

    pasoDos.classList.add("invisible");

    pasoTres.classList.remove("invisible");

}

//PASO TRES

function fijarDiv() {
    let deportes = document.querySelectorAll(".deporte");
    deportes.forEach(deporte => {


        if (deporte.classList.contains("fijado")) {
            deporte.classList.remove("fijado");
        }
    });


    if (!this.classList.contains("fijado")) {
        this.classList.add("fijado");
    } else {
        this.classList.remove("fijado");
    }


    deporteElegido = this.children[0].children[0].alt;
    let formulario = document.querySelectorAll(".formulario")[0];

    let inputDeporte = document.createElement("input");
    inputDeporte.name = "deporteElegido";
    inputDeporte.value = deporteElegido;
    inputDeporte.classList.add("invisible");

    formulario.appendChild(inputDeporte);



}

function pasoTres() {
    console.log(deporteElegido);
    enviarForm();
    /*if (deporteElegido == "") {
        crearAlertas("Debes seleccionar un deporte");
    } else {
        
    }*/
}

function enviarForm() {
    console.log("envio formulario");

    document.formularioSignUp.submit();
}



function crearAlertas(textoAlerta) {
    let alertas = document.getElementsByClassName("alertas")[0];
    let alerta = document.createElement("div");
    alerta.classList.add("alert");
    alerta.classList.add("alert-danger");
    alerta.innerHTML = textoAlerta;
    alertas.appendChild(alerta);


    let cruz = document.createElement("img");
    cruz.classList.add("cruz");
    cruz.src = "/img/cruz.png";
    cruz.width = "15";
    cruz.height = "15";
    alerta.appendChild(cruz);
    cruz.addEventListener("click", deleteAlerta);
}

function deleteAlerta() {

    let alerta = document.getElementsByClassName("alertas")[0];
    alerta.removeChild(this.parentNode);
    //location.reload();
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function mostrarDatos() {

    fetch('../others/municipios.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            datosJson = myJson[0];
            addOptions("comunidades", comunidadesaux)

        });

}



function init() {
    listener();
    mostrarDatos();
}


window.onload = init;