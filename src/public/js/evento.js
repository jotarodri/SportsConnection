let unido;
let usuarios = [];
let usuariosComunidad = [];

var mapa;

function listeners() {
    let boton = document.querySelector(".verUsuario");
    boton.addEventListener("click", irAlPerfil);

    let verUnidos = document.querySelector(".botonParticipantes");
    verUnidos.addEventListener("click", mostrarParticipantes);

    let cerrarUsers = document.querySelector(".cerrarUsers");
    cerrarUsers.addEventListener("click", mostrarParticipantes);

    let botonComentarios = document.querySelector(".botonComentarios");
    botonComentarios.addEventListener("click", mostrarComentarios);

    let hazComentario = document.querySelector(".hazComentario");
    hazComentario.addEventListener("click", hacerComentario);
}

function cambiarEstilo() {
    console.log(unido);
    let boton = document.querySelector(".unirseEvento");
    if (unido == "true") {
        boton.classList.remove("btn-success");
        boton.classList.add("btn-danger");
        boton.innerHTML = "Salir del evento"
            //boton.disabled = true;



    }
    if (unido == "false") {
        // boton.classList.remove("unido");
        boton.disabled = false;
        console.log("DESBLOQUEADO");
    }


}

function getUsuarios() {
    let usuariosUnidos = document.querySelectorAll(".usuario").length;
    let id = document.querySelectorAll(".idUnidos");
    let nombreUsuario = document.querySelectorAll(".usuariosUnidos");
    console.log(usuariosUnidos);



    for (let i = 0; i < usuariosUnidos; i++) {

        let usuario = {
            "id": id[i].innerHTML,
            "nombre": nombreUsuario[i].innerHTML,
        };
        usuarios.push(usuario);
    }
    console.log(usuarios);

}

function irAlPerfil() {;

    let usuarioClickado = this.value;
    console.log(usuarioClickado);
    console.log(usuarios);

    usuarios.forEach(element => {
        if (usuarioClickado == element.id) {
            window.location = "/user/" + element.id;
        }
    });

}

function ponerImagen() {
    let tipodeporte = document.querySelector(".deporte").innerHTML;
    let divDeporte = document.querySelector(".imagenDeporte");
    let imagen;
    switch (tipodeporte) {
        case "FUTBOL":
            imagen = "/img/deportesReal/futbol.jpg"
            break;

        case "BALONCESTO":
            imagen = "/img/deportesReal/baloncesto.jpg"
            break;

        case "BEISBOL":
            imagen = "/img/deportesReal/beisbol.jpeg"
            break;

        case "PADEL":
            imagen = "/img/deportesReal/padel.jpg"
            break;

        case "RUNNING":
            imagen = "/img/deportesReal/running.jpg"
            break;

        case "PADEL":
            imagen = "/img/deportesReal/padel.jpg"
            break;

        case "TENIS":
            imagen = "/img/deportesReal/tenis.gif"
            break;

        case "SENDERISMO":
            imagen = "/img/deportesReal/descarga.jpg"
            break;
    }

    divDeporte.style.backgroundImage = "url(" + imagen + ")";


}

function formatearFecha() {
    let fecha = document.querySelector(".fecha").innerHTML;
    let fechaFormateado = new Date(fecha);
    let mes = fechaFormateado.getMonth() + 1;
    let fechaCompleta = fechaFormateado.getDate() + " / " + mes + " / " + fechaFormateado.getFullYear();

    let hora = document.querySelector(".hora").innerHTML;
    let fechaHora = document.querySelector(".fechaHora");
    console.log(fechaHora);

    fechaHora.innerHTML = "Fecha y hora: " + fechaCompleta + " - " + hora;

}

function crearMapaInicial() {

    let direccion = document.querySelector(".direccion").innerHTML;

    var arrayDeCadenas = direccion.split("/");
    console.log(arrayDeCadenas);

    let longitud = arrayDeCadenas[0];
    let latitud = arrayDeCadenas[1];


    if (mapa != undefined) {
        mapa.off();
        mapa.remove();
    }
    mapa = L.map('map').setView([longitud, latitud], 17);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoicm9kcmlndWV6am9yZ2UiLCJhIjoiY2tiODNuOGRuMDBoMjJ6cGJkN28yZGVlNCJ9.aSGvBk5e5Q1AYwLshakWxg',
    }).addTo(mapa);



    L.marker([longitud, latitud], {
            title: "Augusta Emerita",
            draggable: false,
            opacity: 0.75
        }).bindPopup("<i>Augusta Emerita</i>")
        .addTo(mapa);


}

function setBackground() {

    let deporte = document.querySelector(".deporte").innerHTML;
    console.log(deporte);
    let imagen;

    switch (deporte) {
        case "FUTBOL":
            imagen = "/img/backgrounds/futbol.jpg"
            break;

        case "BALONCESTO":
            imagen = "/img/backgrounds/basket.jpg"
            break;

        case "BEISBOL":
            imagen = "/img/backgrounds/beisbol.jpg"
            break;

        case "PADEL":
            imagen = "/img/backgrounds/padel.jpg"
            break;

        case "RUNNING":
            imagen = "/img/backgrounds/running.jpg"
            break;

        case "PADEL":
            imagen = "/img/deportesReal/padel.jpg"
            break;

        case "TENIS":
            imagen = "/img/backgrounds/tenis.jpg"
            break;

        case "SENDERISMO":
            imagen = "/img/backgrounds/senderismo.jpg"
            break;
    }

    let contenedor = document.querySelector(".contenedor");
    contenedor.style.backgroundImage = "url(" + imagen + ")";
}

function mostrarParticipantes() {

    document.querySelector(".tarjeta").classList.toggle("invisible")
    document.querySelector(".divUsers").classList.toggle("invisible")
}

function mostrarComentarios() {

    document.querySelector(".tarjeta").classList.toggle("invisible")
    document.querySelector(".containerComentarios").classList.toggle("invisible")
}

function hacerComentario() {
    document.formComentario.submit();
}

function setUsersUnidos() {
    let listaUsers = document.querySelector(".listaUsuariosUnidos");
    let usuariosUnidos = document.querySelectorAll(".usuariosUnidos");
    let idUnidos = document.querySelectorAll(".idUnidos");
    console.log(idUnidos[0].innerHTML);

    let arrayUsers = [];

    for (let i = 0; i < usuariosUnidos.length; i++) {

        let usuario = {
            "nombre": usuariosUnidos[i].innerHTML,
            "id": idUnidos[i].innerHTML,
        }
        arrayUsers.push(usuario);
    }

    console.log(arrayUsers);


    arrayUsers.forEach(element => {

        let usuario = document.createElement("li");
        usuario.innerHTML = element.nombre;
        usuario.classList.add("usuarioUnido");
        let botonVer = document.createElement("div");
        botonVer.innerHTML = "Ver";
        botonVer.value = element.id;
        botonVer.classList.add("verUsuario");
        botonVer.classList.add("btn");
        botonVer.classList.add("btn-light")
        usuario.appendChild(botonVer);
        listaUsers.appendChild(usuario);
    });

}

function init() {
    unido = document.querySelector(".eventoUnido").innerHTML;
    cambiarEstilo();
    setUsersUnidos();
    listeners();
    getUsuarios();
    ponerImagen();
    formatearFecha();
    crearMapaInicial();
    setBackground();



}

window.onload = init;