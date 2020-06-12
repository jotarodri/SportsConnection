let ids;
let titulos;
let tipodeporte;
let description;
let nparticipantes;
let nparticipantesMAX;
let created_at;
let fechas;
let horas;
let municipios;
let direcciones;
let user_ids;
let comunidades;
let links;
let passwords;


function init() {

    ids = document.querySelectorAll(".id");
    titulos = document.querySelectorAll(".tituloEvento");
    tipodeporte = document.querySelectorAll(".tipodeporte");
    description = document.querySelectorAll(".description");
    nparticipantes = document.querySelectorAll(".nparticipantes");
    nparticipantesMAX = document.querySelectorAll(".nparticipantesMAX");
    created_at = document.querySelectorAll(".created_at");
    passwords = document.querySelectorAll(".password");
    fechas = document.querySelectorAll(".fecha");
    horas = document.querySelectorAll(".hora");
    municipios = document.querySelectorAll(".municipio");
    direcciones = document.querySelectorAll(".direccion");
    user_ids = document.querySelectorAll(".user_id");
    comunidades = document.querySelectorAll(".comunidad");

    links = document.querySelectorAll(".links")[0].innerHTML;

    let eventos = [];

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

    console.log(eventos);

}

window.onload = init;