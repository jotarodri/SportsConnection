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
            "id": ids[i].innerHTML,
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
            "creado_el": created_at[i].innerHTML
        }
        eventos.push(evento);

    }

    filtrarPorComunidad();
}

function filtrarPorComunidad() {

    eventos.forEach(evento => {

        if (evento.comunidad == comunidadUsuario.toUpperCase()) {
            let eventoComunidadUsuario = {
                "id": evento.id,
                "titulo": evento.titulo,
                "nparticipantes": evento.nparticipantes,
                "nparticipantesMAX": evento.nparticipantesMAX,
                "fecha": evento.fecha,
                "hora": evento.hora,
                "creado": evento.creado_el,
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
        let tarjetaEvento = document.querySelector(".tarjetaEvento");


        let parteSuperior = document.querySelector(".parteSuperior");
        crearParteSuperior(evento, parteSuperior);

        let parteInferior = document.querySelector(".parteInferior");
        crearParteInferior(evento, parteInferior);

        let creadoPorDiv = document.createElement("div");
        let creadoPor = document.createElement("p");
        creadoPor.innerHTML = "Creado por " + document.querySelector(".user").innerHTML;
        console.log(document.querySelector(".user").innerHTML);

        creadoPorDiv.classList.add("creadoPor");

        creadoPorDiv.appendChild(creadoPor);


        tarjetaEvento.appendChild(parteSuperior);
        tarjetaEvento.appendChild(parteInferior);
        tarjetaEvento.appendChild(creadoPorDiv);
        eventos.appendChild(tarjetaEvento);
    });


}

function crearParteSuperior(evento, parteSuperior) {


    /*let parteSuperior = document.createElement("div");
    parteSuperior.classList.add("parteSuperior");
*/
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

function crearParteInferior(evento, parteInferior) {
    /* let parteInferior = document.createElement("div");
     parteInferior.classList.add("parteInferior");*/

    let participantesEvento = document.createElement("div");
    participantesEvento.classList.add("participantesEvento");

    let participantes = document.createElement("p");
    participantes.innerHTML = "Participantes"

    participantes.classList.add("flex-center")
    participantes.classList.add("ml-3");

    participantesEvento.appendChild(participantes)
    let numeroParticipantes = document.createElement("h5");

    numeroParticipantes.innerHTML = evento.nparticipantes + " de " + evento.nparticipantesMAX;

    participantes.appendChild(numeroParticipantes);


    let acabaElEvento = document.createElement("div");
    acabaElEvento.classList.add("acabaEl");

    let acaba = document.createElement("p");
    acaba.innerHTML = "Acaba el"
    acaba.classList.add("flex-center");

    acabaElEvento.appendChild(acaba);

    let acabaEl = document.createElement("h5");
    acabaEl.classList.add("ml-5");
    let fecha = new Date(evento.fecha);
    let mes = fecha.getMonth() + 1;
    acabaEl.innerHTML = fecha.getDate() + " / " + mes + " / " + fecha.getFullYear();

    acaba.appendChild(acabaEl);

    let verEvento = document.createElement("div");
    verEvento.classList.add("verEvento");

    let a = document.createElement("a");
    a.href = "/evento/" + evento.id;

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


function changeImage() {

    var listaimg = ["/img/backgrounds/futbol.jpg", "/img/backgrounds/basket.jpg", "/img/backgrounds/running.jpg", "/img/backgrounds/tenis.jpg", "/img/backgrounds/beisbol.jpg", "/img/backgrounds/padel.jpg", "/img/backgrounds/senderismo.jpg"];

    /*$('body').css("background-image", 'url(' + listaimg[index] + ')');
     */

    let random = Math.floor(Math.random() * (6 - 0)) + 0;
    console.log("random" + random);

    let contenedor = document.querySelector(".contenedor");

    contenedor.style.backgroundImage = "url(" + listaimg[random] + ")";
    contenedor.style.animation = "slideBg 0s linear";
}

function init() {
    comunidadUsuario = document.querySelector(".comunidadUser").innerHTML;
    getTodosEventos();

    changeImage();

}

window.onload = init;