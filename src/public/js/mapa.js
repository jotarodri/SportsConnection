let datosJson;
let arrayaux = [];
let localidades = {
    localidad: "",
    coordenadaY: "",
    coordenadaX: "",
};
let provincia;
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

    fetch('../others/espana-municipios.geojson')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            datosJson = myJson;
            crearLocalidades();
        });

}

function crearLocalidades() {
    datosJson.features.forEach(dato => {
        if (dato.properties.provincia.toUpperCase() == provincia) {

            localidades = {
                "localidad": dato.properties.municipio.toUpperCase(),
                "coordenadaY": dato.properties.geo_point_2d[1],
                "coordenadaX": dato.properties.geo_point_2d[0],
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

    arrayaux.forEach(municipio => {
        if (municipio.localidad == municipioSeleccionado) {
            datosSeleccionado = {
                localidad: municipio.localidad,
                coordenadaY: municipio.coordenadaX,
                coordenadaX: municipio.coordenadaY,
            };
        }
    });

    if (municipioSeleccionado = "") {
        municipioSeleccionado = provincia;
    }
    console.log(municipioSeleccionado);


    let municipioSeleccionadoDiv = document.querySelector(".municipioSeleccionado");
    municipioSeleccionadoDiv.innerHTML = municipioSeleccionado;


    crearMapa(datosSeleccionado);

}

function crearMapa(datosMunicipio) {

    latitudEvento = datosMunicipio.coordenadaY;
    longitudEvento = datosMunicipio.coordenadaX;

    mymap.off();
    mymap.remove();
    mymap = L.map('map').setView([datosMunicipio.coordenadaY, datosMunicipio.coordenadaX], 17);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoicm9kcmlndWV6am9yZ2UiLCJhIjoiY2tiODNuOGRuMDBoMjJ6cGJkN28yZGVlNCJ9.aSGvBk5e5Q1AYwLshakWxg'
    }).addTo(mymap);

    L.marker([datosMunicipio.coordenadaY, datosMunicipio.coordenadaX], {
            title: "Augusta Emerita",
            draggable: true,
            opacity: 0.75
        }).bindPopup("<i>Augusta Emerita</i>").addEventListener("dragend", getCalle)
        .addTo(mymap);

}

function crearMapaInicial() {


    if (mymap != undefined) {
        mymap.off();
        mymap.remove();
    }

    let municipioOriginal = {
        "localidad": "",
        "coordenadaY": "",
        "coordenadaX": ""
    };
    if (datosJson != undefined) {
        datosJson.features.forEach(dato => {

            if (dato.properties.municipio.toUpperCase() == provincia) {
                municipioOriginal = {
                    "localidad": dato.properties.municipio.toUpperCase(),
                    "coordenadaY": dato.properties.geo_point_2d[1],
                    "coordenadaX": dato.properties.geo_point_2d[0],
                };
            }

        });

        mymap = L.map('map').setView([municipioOriginal.coordenadaX, municipioOriginal.coordenadaY], 17).addEventListener("click", getCalle);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1Ijoicm9kcmlndWV6am9yZ2UiLCJhIjoiY2tiODNuOGRuMDBoMjJ6cGJkN28yZGVlNCJ9.aSGvBk5e5Q1AYwLshakWxg'
        }).addTo(mymap);



        L.marker([municipioOriginal.coordenadaX, municipioOriginal.coordenadaY], {
                title: "Augusta Emerita",
                draggable: true,
                opacity: 0.75
            }).bindPopup("<i>Augusta Emerita</i>").addEventListener("dragend", getCalle)
            .addTo(mymap);

        let inputLatitud = document.querySelector(".longitudElegida");
        inputLatitud.value = municipioOriginal.coordenadaX;

        let inputLongitud = document.querySelector(".latitudElegida");
        inputLongitud.value = municipioOriginal.coordenadaY;
    }


}

function eliminarMunicipioSeleccionado() {
    let municipioSeleccionado = document.querySelector(".municipioSeleccionado");
    if (municipioSeleccionado.firstChild != undefined) {
        municipioSeleccionado.removeChild(municipioSeleccionado.firstChild);
    }

}

function getCalle() {

    latitudEvento = this._latlng.lat;
    longitudEvento = this._latlng.lng;
    console.log(latitudEvento);
    console.log(longitudEvento);

    let inputLatitud = document.querySelector(".longitudElegida");
    inputLatitud.value = longitudEvento;

    let inputLongitud = document.querySelector(".latitudElegida");
    inputLongitud.value = latitudEvento;

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

    mostrarDatos();
    listeners();
}


window.onload = init;