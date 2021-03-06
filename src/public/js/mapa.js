let datosJson;
let arrayaux = [];
let localidades = {
    localidad: "",
    coordenadaY: "",
    coordenadaX: "",
};
let provincia;
let comunidad;
var mymap;

let privacidad = "publico";

let latitudEvento;
let longitudEvento;

function listeners() {
    //PARA EL MAPA
    let search = document.querySelectorAll(".search")[0];
    search.addEventListener("input", filtrarMunicipios);

    //PARA EL DEPORTE Y LA PRIVACIDAD
    let botonDeportes = document.querySelectorAll(".tipoDeporte")[0];
    botonDeportes.addEventListener("click", mostrarDeportes);

    let deportes = document.querySelectorAll(".deporte");
    deportes.forEach(deporte => {
        deporte.addEventListener("click", seleccionarDeporte);
    });

    let botonesPrivacidad = document.querySelectorAll(".btnPrivacidad");

    botonesPrivacidad.forEach(btn => {
        btn.addEventListener("click", cambiarPrivacidad);
    });

    let botonCrear = document.querySelector(".enviarForm");
    botonCrear.addEventListener("click", comprobarInputs);

    let inputMunicipioSeleccionado = document.querySelector(".municipioElegido");
    inputMunicipioSeleccionado.value = provincia;

}
//AQUI EMPIEZA LA PARTE DEL MAPA
function mostrarDatos() {

    fetch('../others/municipios.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            datosJson = myJson[0];

            crearLocalidades();
        });

}

function crearLocalidades() {
    datosJson.forEach(dato => {

        if (dato.Provincia.toUpperCase() == provincia) {

            localidades = {
                "localidad": dato.Población.toUpperCase(),
                "longitud": dato.Latitud,
                "latitud": dato.Longitud,
            };
            arrayaux.push(localidades);
        }


    });
    crearMapaInicial();
}

function filtrarMunicipios() {

    eliminarMunicipioSeleccionado();

    let valorInput = this.value.toUpperCase();
    let municipiosFiltrados = [];
    let listaMunicipios = document.querySelector(".listaMunicipios");
    listaMunicipios.classList.remove("eliminado");
    if (valorInput != "") {

        if (valorInput.length <= 1) {

            municipiosFiltrados = arrayaux.filter(municipio => String(municipio.localidad).startsWith(valorInput));


        } else {
            if (listaMunicipios.hasChildNodes()) {
                while (listaMunicipios.childNodes.length >= 1) {
                    listaMunicipios.removeChild(listaMunicipios.firstChild);
                }
            }
            municipiosFiltrados = arrayaux.filter(municipio => String(municipio.localidad).includes(valorInput));

        }


        municipiosFiltrados.forEach(element => {

            let municipioContainer = document.createElement("li");

            let municipio = document.createElement("a");
            municipio.classList.add("municipio");
            municipio.innerHTML = element.localidad;

            municipioContainer.appendChild(municipio)
            listaMunicipios.appendChild(municipioContainer);

        });

        let listadoMunicipios = document.querySelectorAll(".municipio");
        listadoMunicipios.forEach(municipio => {
            municipio.addEventListener("click", getDatosMunicipio);
        });
    } else {

        let municipioSeleccionadoDiv = document.querySelector(".municipioSeleccionado");
        municipioSeleccionadoDiv.innerHTML = provincia;

        crearMapaInicial();

        if (listaMunicipios.hasChildNodes()) {
            while (listaMunicipios.childNodes.length >= 1) {
                listaMunicipios.removeChild(listaMunicipios.firstChild);
            }
        }


    }
}

function getDatosMunicipio() {
    let listaMunicipios = document.querySelector(".listaMunicipios");
    listaMunicipios.classList.add("eliminado");
    let datosSeleccionado = {
        localidad: "",
        coordenadaY: "",
        coordenadaX: "",
    };
    let municipioSeleccionado = this.innerHTML;

    let municipio = document.querySelector(".municipioElegido");
    municipio.value = municipioSeleccionado;
    console.log(municipio);

    arrayaux.forEach(municipio => {
        if (municipio.localidad == municipioSeleccionado) {
            datosSeleccionado = {
                localidad: municipio.localidad,
                longitud: municipio.longitud,
                latitud: municipio.latitud,
            };
        }
    });

    /*if (municipioSeleccionado = "") {
        municipioSeleccionado = provincia;
    }*/

    let municipioSeleccionadoDiv = document.querySelector(".municipioSeleccionado");
    console.log(municipioSeleccionado);

    municipioSeleccionadoDiv.innerHTML = municipioSeleccionado;


    crearMapa(datosSeleccionado);

}

function crearMapa(datosMunicipio) {

    latitudEvento = datosMunicipio.latitud;
    longitudEvento = datosMunicipio.longitud;

    mymap.off();
    mymap.remove();
    mymap = L.map('map').setView([longitudEvento, latitudEvento], 17);


    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoicm9kcmlndWV6am9yZ2UiLCJhIjoiY2tiODNuOGRuMDBoMjJ6cGJkN28yZGVlNCJ9.aSGvBk5e5Q1AYwLshakWxg'
    }).addTo(mymap);

    L.marker([longitudEvento, latitudEvento], {
            title: "Augusta Emerita",
            draggable: true,
            opacity: 0.75
        }).bindPopup("<i>Augusta Emerita</i>")
        .addTo(mymap);

    mymap.on('click', getCalle);

}

function crearMapaInicial() {


    if (mymap != undefined) {
        mymap.off();
        mymap.remove();
    }

    let municipioOriginal = {
        "localidad": "",
        "longitud": "",
        "latitud": ""
    };
    if (datosJson != undefined) {
        arrayaux.forEach(dato => {

            if (dato.localidad.toUpperCase() == "VALENCIA") {
                municipioOriginal = {
                    "localidad": dato.localidad.toUpperCase(),
                    "longitud": dato.longitud,
                    "latitud": dato.latitud,
                };
            } else {
                if (dato.localidad.toUpperCase() == provincia) {
                    municipioOriginal = {
                        "localidad": dato.localidad.toUpperCase(),
                        "longitud": dato.longitud,
                        "latitud": dato.latitud,
                    };
                }
            }



        });

        console.log(municipioOriginal);


        mymap = L.map('map').setView([municipioOriginal.longitud, municipioOriginal.latitud], 17)

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1Ijoicm9kcmlndWV6am9yZ2UiLCJhIjoiY2tiODNuOGRuMDBoMjJ6cGJkN28yZGVlNCJ9.aSGvBk5e5Q1AYwLshakWxg'
        }).addTo(mymap);



        L.marker([municipioOriginal.longitud, municipioOriginal.latitud], {
                title: "Augusta Emerita",
                draggable: false,
                opacity: 0.75
            }).bindPopup("<i>Augusta Emerita</i>")
            .addTo(mymap);

        mymap.on('click', getCalle);

    }


}

function eliminarMunicipioSeleccionado() {
    let municipioSeleccionado = document.querySelector(".municipioSeleccionado");
    if (municipioSeleccionado.firstChild != undefined) {
        municipioSeleccionado.removeChild(municipioSeleccionado.firstChild);
    }

}

function getCalle(e) {;

    let ubicacion = e.latlng;


    let inputLatiud = document.querySelector(".inputLatitud");
    inputLatiud.value = ubicacion.lat;


    let inputLongitud = document.querySelector(".inputLongitud");
    inputLongitud.value = ubicacion.lng;
    console.log(inputLatiud.value);
    console.log(inputLongitud.value);
    // console.log(ubicacionElegida.value);
    mymap.off();
    mymap.remove();


    mymap = L.map('map').setView([ubicacion.lat, ubicacion.lng], 17)
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoicm9kcmlndWV6am9yZ2UiLCJhIjoiY2tiODNuOGRuMDBoMjJ6cGJkN28yZGVlNCJ9.aSGvBk5e5Q1AYwLshakWxg'
    }).addTo(mymap);

    L.marker([ubicacion.lat, ubicacion.lng], {
        draggable: false,
        opacity: 0.75
    }).addTo(mymap);

    mymap.on('click', getCalle);

}

//AQUI EMPIEZA LA PARTE DEL DEPORTE Y LA PRIVACIDAD


function mostrarDeportes() {
    let deportes = document.querySelectorAll(".divDeportes")[0];
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
    document.querySelectorAll(".divDeportes")[0].classList.remove("visible")
    document.querySelector("body").classList.remove("noScroll")

    let inputDeporte = document.querySelector(".deporteElegido");
    inputDeporte.value = nombreDeporte.toUpperCase();;

    console.log(inputDeporte);


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

    crearPassword(privacidad);

}

function crearPassword(privacidad) {

    let inputPassword = document.querySelector(".contraseña");

    if (privacidad == "publico") {
        inputPassword.classList.add("eliminado");
    } else {
        inputPassword.classList.remove("eliminado");
        document.querySelector(".descripcion").classList.add("mt-4");
    }


}

function comprobarInputs() {

    let titulo = document.querySelector(".tituloevento");
    let nparticipantes = document.querySelector(".nparticipantes");


    let deporteElegido = document.querySelector(".deporteElegido");
    let password = document.querySelector(".password");

    let descripcion = document.querySelector(".descripciontext");

    if (titulo.value == "") {
        crearAlertas("Debes introducir un titulo");
    }

    if (nparticipantes == 0) {
        crearAlertas("No pueden haber 0 participantes");
    } else if (nparticipantes.value < 0) {
        crearAlertas("No puedes poner un numero negativo de participantes");
    }

    if (privacidad == "privado" && password.value == "") {
        crearAlertas("Al ser un evento privado debes poner una contraseña");
    }

    if (descripcion.value == "") {
        crearAlertas("Debes poner una descripcion al evento");
    }

    if (deporteElegido.value == "") {
        crearAlertas("Debes elegir un deporte");
    }

    if (titulo.value != "" && nparticipantes.value != 0 && nparticipantes.value > 0 && privacidad == "privado" && password.value != "" && descripcion.value != "" && deporteElegido.value != "") {

        enviarForm();
    }

    if (titulo.value != "" && nparticipantes.value != 0 && nparticipantes.value > 0 && privacidad == "publico" && descripcion.value != "" && deporteElegido.value != "") {
        console.log("Envio form");

        enviarForm();
    }

}

function enviarForm() {
    document.formularioAdd.submit();
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

function init() {
    provincia = document.querySelectorAll(".card-body")[0].classList[1].toUpperCase();
    comunidad = document.querySelectorAll(".card-body")[0].classList[2].toUpperCase();

    let comunidadEvento = document.querySelector(".comunidad");
    comunidadEvento.value = comunidad;

    mostrarDatos();
    listeners();
}


window.onload = init;