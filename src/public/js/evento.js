let unido;
let usuarios = [];
let usuariosComunidad = [];
let id;
var mapa;
let form;
let idUser;
let idUnidos;

function listeners() {
    let boton = document.querySelector(".verUsuario");
    boton.addEventListener("click", irAlPerfil);

    let verUnidos = document.querySelector(".botonParticipantes");
    verUnidos.addEventListener("click", mostrarParticipantes);

    let cerrarUsers = document.querySelector(".cerrarUsers");
    cerrarUsers.addEventListener("click", mostrarParticipantes);

    let botonComentarios = document.querySelectorAll(".botonComentarios");
    botonComentarios.forEach(element => {
        element.addEventListener("click", mostrarComentarios);
    });

    let botonComent = document.querySelector(".hazComentario");
    botonComent.addEventListener("click", hacerComentario)
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
    console.log("VAS A HACER COMENTARIO");
    let comentario = document.querySelector(".comentarioEscrito");
    let value = comentario.value.toUpperCase();
    let input = document.querySelector(".coment");
    input.value = value;
    document.formComentario.submit();


}


function bloquearBotonUnirse() {
    form = document.querySelector(".unirse");
    let formUnirse = document.querySelectorAll(".formUnirse")[0];
    form.removeChild(formUnirse);
    let boton = document.querySelector(".unirseEvento");
    boton.classList.remove("btn-success");
    boton.classList.add("btn-danger");
    boton.classList.remove("unirseEvento");
    boton.innerHTML = "Ya no puedes unirte";
}

function bloquearBotonUnirseAcabado() {
    form = document.querySelector(".unirse");
    let formUnirse = document.querySelectorAll(".formUnirse")[0];
    form.removeChild(formUnirse);
    let boton = document.querySelector(".unirseEvento");
    boton.classList.remove("btn-success");
    boton.classList.add("btn-danger");
    boton.classList.remove("unirseEvento");
    boton.innerHTML = "El evento ha finalizado";
}

function crearComentario29() {
    let comentarios = document.querySelectorAll(".uno");
    console.log(comentarios);

    comentarios.forEach(element => {
        element.classList.remove("none")
    });

    //let unidos = document.querySelectorAll(.uno)
}

function crearComentario31() {
    let comentarios = document.querySelectorAll(".dos");
    console.log(comentarios);

    comentarios.forEach(element => {
        element.classList.remove("none")
    });

    //let unidos = document.querySelectorAll(.uno)
}

function crearComentario32() {
    let comentarios = document.querySelectorAll(".tres");
    console.log(comentarios);

    comentarios.forEach(element => {
        element.classList.remove("none")
    });

    //let unidos = document.querySelectorAll(.uno)
}

/*function habilitarBorrar() {
    // let editar = document.querySelector(".editar");
    let borrar = document.querySelector(".borrar");

    //editar.classList.remove("none");
    borrar.classList.remove("none");

    console.log(borrar);

    borrar.addEventListener("click", enviarFormBorrar);
}

function enviarFormBorrar() {
    let form = document.getElementById("myForm")
    console.log(form);

}*/

function init() {

    unido = document.querySelector(".eventoUnido").innerHTML;
    cambiarEstilo();
    listeners();
    getUsuarios();
    ponerImagen();
    formatearFecha();
    crearMapaInicial();
    setBackground();

    id = document.querySelector(".idEvento").value;
    nparticipantes = document.querySelector(".npart").value;
    nparticipantesMAX = document.querySelector(".npartMAX").value;
    idUser = document.querySelector(".idUser").value;
    idUnidos = document.querySelector(".xi").value;
    if (nparticipantes == nparticipantesMAX) {
        bloquearBotonUnirse();
    }

    if (id == 29) {
        crearComentario29();
    }
    if (id == 31) {
        bloquearBotonUnirseAcabado();
        crearComentario31();
    }
    if (id == 32) {
        //bloquearBotonUnirseAcabado();
        crearComentario32();
    }
    if (idUser == idUnidos) {
        habilitarBorrar();
    }


}

window.onload = init;