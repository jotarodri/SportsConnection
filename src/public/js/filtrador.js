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
                "municipio": evento.municipio
            }

            eventosComunidad.push(eventoComunidadUsuario);
        }

    });

    console.log(eventosComunidad);


}

function init() {
    comunidadUsuario = document.querySelector(".comunidadUser").innerHTML;


    getTodosEventos();

}

window.onload = init;