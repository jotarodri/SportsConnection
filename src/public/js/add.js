let privacidad;
var map;

function listeners() {
    let botonDeportes = document.querySelectorAll(".tipoDeporte")[0];
    botonDeportes.addEventListener("click", mostrarDeportes);

    let deportes = document.querySelectorAll(".deporte");
    deportes.forEach(deporte => {
        deporte.addEventListener("click", seleccionarDeporte);
    });

    let botonesPrivacidad = document.querySelectorAll(".btn");

    botonesPrivacidad.forEach(btn => {
        btn.addEventListener("click", cambiarPrivacidad);
    });
}

function mostrarDeportes() {
    let deportes = document.querySelectorAll(".PopupPanel")[0];
    let deportesSeleccion = document.querySelectorAll(".tipoDeporte")[0];
    deportesSeleccion.classList.add("noHover");
    deportes.classList.add("visible");
    let body = document.querySelector("body");
    body.classList.add("noScroll")
}

function seleccionarDeporte() {
    let nombreDeporte = this.classList[0];
    let srcDeporte = this.children[0].src;

    let botonDeportes = document.querySelectorAll(".tipoDeporte")[0];
    let nombreDeporteElegido = document.querySelectorAll(".nombreDeporte")[0];

    botonDeportes.children[0].src = srcDeporte;


    nombreDeporteElegido.innerHTML = nombreDeporte.toUpperCase();

    botonDeportes.classList.remove("noHover");
    document.querySelectorAll(".PopupPanel")[0].classList.remove("visible")
    document.querySelector("body").classList.remove("noScroll")

}

function cambiarPrivacidad() {


    let imgCandado = document.querySelectorAll(".candado")[0];

    if (this.classList.contains("publico")) {
        privacidad = "publico";
        imgCandado.src = "/img/abierto.png"
    } else {
        privacidad = "privado";
        imgCandado.src = "/img/cerrado.png"
    }

    if (privacidad == "privado") {
        crearPassword();
    }


}



function init() {
    listeners();
}


window.onload = init;