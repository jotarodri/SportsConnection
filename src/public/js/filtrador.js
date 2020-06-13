let eventos = [];
let comunidadUsuario;
let eventosComunidad = []; //Los eventos de la misma comunidad del usuario
function getTodosEventos() {
    let ids = document.querySelectorAll(".id");
    let titulos = document.querySelectorAll(".tituloEvento");
    let tipodeporte = document.querySelectorAll(".tipodeporte");
    let description = document.querySelectorAll(".description");
    let nparticipantes = document.querySelectorAll(".nparticipantes");
    let nparticipantesMAX = document.querySelectorAll(".nparticipantesMAX");
    let created_at = document.querySelectorAll(".created_at");
    let passwords = document.querySelectorAll(".password");
    let fechas = document.querySelectorAll(".fecha");
    let horas = document.querySelectorAll(".hora");
    let municipios = document.querySelectorAll(".municipio");
    let direcciones = document.querySelectorAll(".direccion");
    let user_ids = document.querySelectorAll(".user_id");
    let comunidades = document.querySelectorAll(".comunidad");

    let links = document.querySelectorAll(".links")[0].innerHTML;



    for (let i = 0; i < links; i++) {

        let evento = {
            "titulo": titulos[i].innerHTML,
            "tipodeporte": tipodeporte[i].innerHTML,
            "description": description[i].innerHTML,
            "nparticipantes": nparticipantes[i].innerHTML,
            "nparticipantesMAX": nparticipantesMAX[i].innerHTML,
            "password": passwords[i].innerHTML,
            "fecha": fechas[i].innerHTML,
            "hora": horas[i].innerHTML,
            "municipio": municipios[i].innerHTML,
            "direccion": direcciones[i].innerHTML,
            "user_id": user_ids[i].innerHTML,
            "comunidad": comunidades[i].innerHTML,
            "creado:el": created_at[i].innerHTML
        }
        eventos.push(evento);

    }

    filtrarPorComunidad();
}

function filtrarPorComunidad() {

    eventos.forEach(evento => {

        if (evento.comunidad == comunidadUsuario.toUpperCase()) {
            let eventoComunidadUsuario = {
                "titulo": evento.titulo,
                "nparticipantes": evento.nparticipantes,
                "nparticipantesMAX": evento.nparticipantesMAX,
                "fecha": evento.fecha,
                "hora": evento.hora,
                "municipio": evento.municipio,
                "deporte": evento.tipodeporte
            }

            eventosComunidad.push(eventoComunidadUsuario);
        }

    });

    crearDivs();


}

function crearDivs() {
    let eventos = document.querySelector(".eventos");
    eventosComunidad.forEach(evento => {
        let tarjetaEvento = document.createElement("div");
        tarjetaEvento.classList.add("tarjetaEvento");

        let parteSuperior = crearParteSuperior(evento);
        let parteInferior = crearParteInferior(evento);

        tarjetaEvento.appendChild(parteSuperior);
        tarjetaEvento.appendChild(parteInferior);
        eventos.appendChild(tarjetaEvento);
    });


}

function crearParteSuperior(evento) {


    let parteSuperior = document.createElement("div");
    parteSuperior.classList.add("parteSuperior");

    let imageDeporte = document.createElement("div");
    imageDeporte.classList.add("imagenDeporte");
    imageDeporte.style.backgroundImage = "url(" + getImagenDeporte(evento) + ")";

    let tituloEvento = document.createElement("div");
    tituloEvento.classList.add("tituloEvento");

    let eventoTitulo = document.createElement("h4");
    eventoTitulo.classList.add("eventoTitulo");
    eventoTitulo.innerHTML = evento.titulo;

    let muni = document.createElement("div");
    muni.classList.add("muni");

    let eventoMunicipio = document.createElement("h5");
    eventoMunicipio.classList.add("eventoMunicipio");
    eventoMunicipio.innerHTML = evento.municipio

    parteSuperior.appendChild(imageDeporte);
    parteSuperior.appendChild(tituloEvento);
    tituloEvento.appendChild(eventoTitulo);
    muni.appendChild(eventoMunicipio);
    tituloEvento.appendChild(muni);


    return parteSuperior;
}

function crearParteInferior(evento) {
    let parteInferior = document.createElement("div");
    parteInferior.classList.add("parteInferior");

    let participantesEvento = document.createElement("div");
    participantesEvento.classList.add("participantesEvento");

    let numeroParticipantes = document.createElement("h5");
    numeroParticipantes.classList.add("ml-5");
    numeroParticipantes.innerHTML = evento.nparticipantes + " / " + evento.nparticipantesMAX;

    participantesEvento.appendChild(numeroParticipantes);


    let acabaElEvento = document.createElement("div");
    acabaElEvento.classList.add("acabaEl");

    let acabaEl = document.createElement("h5");
    acabaEl.classList.add("ml-5");
    let fecha = new Date(evento.fecha);
    let mes = fecha.getMonth() + 1;
    acabaEl.innerHTML = fecha.getDate() + " / " + mes + " / " + fecha.getFullYear();

    acabaElEvento.appendChild(acabaEl);

    let verEvento = document.createElement("div");
    verEvento.classList.add("verEvento");

    let a = document.createElement("a");

    let eventButton = document.createElement("button");
    eventButton.classList.add("btn");
    eventButton.classList.add("btn-success");
    eventButton.classList.add("eventButton");
    eventButton.type = "button"
    eventButton.innerHTML = "Ver evento"

    let icono = document.createElement("i");
    icono.classList.add("fas");
    icono.classList.add("fa-check");
    icono.classList.add("ml-2");

    //eventButton.appendChild(icono);

    verEvento.appendChild(a);
    a.appendChild(eventButton);

    parteInferior.appendChild(participantesEvento);
    parteInferior.appendChild(acabaElEvento);
    parteInferior.appendChild(verEvento);

    return parteInferior;


}

function getImagenDeporte(evento) {

    console.log(evento);


    let tipodeporte = evento.deporte;
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
    return imagen;
}

function init() {
    comunidadUsuario = document.querySelector(".comunidadUser").innerHTML;
    getTodosEventos();

}

window.onload = init;