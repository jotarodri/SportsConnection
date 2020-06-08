let datosJson;
let localidades = [{
    "localidad": "",
    "coordenadaY": "",
    "coordenadaX": "",
}];
let provincia;

function listeners() {

}

function mostrarDatos() {

    fetch('../others/espana-municipios.geojson')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            datosJson = myJson;
            //console.log(myJson);

            crearLocalidades();
        });

}

async function crearLocalidades() {
    await datosJson.features.forEach(dato => {



        if (dato.properties.provincia == provincia) {
            //console.log(dato.properties.municipio);
            console.log(dato.properties.provincia);
            console.log(provincia);
            //for (var i = 0; i < rows.length; i++) {
            localidades.localidad = dato.properties.municipio;
            localidades.coordenadaY = dato.properties.geo_point_2d[1];
            localidades.coordenadaX = dato.properties.geo_point_2d[0];
            // };
        }

    });

    //console.log(localidades);

}

Array.prototype.unique = function(a) {
    return function() { return this.filter(a) }
}(function(a, b, c) {
    return c.indexOf(a, b + 1) < 0
});

function init() {
    provincia = document.querySelectorAll(".card-body")[0].classList[1];
    console.log(provincia);

    mostrarDatos();
    listeners();
}


window.onload = init;