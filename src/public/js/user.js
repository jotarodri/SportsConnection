let id;

function init() {


    comprobaProvincia();
    crearFecha();
    changeImage();

}


function comprobaProvincia() {
    let provincia = document.querySelector(".provincia").innerHTML;
    console.log(provincia);


    if (provincia == " Valencia/València") {
        let provinciaReal = document.querySelector(".provinciaReal");
        console.log(provinciaReal);

        provinciaReal.innerHTML = "Valencia"
    }
}

function crearFecha() {
    let fecha = document.querySelector(".fecha").innerHTML;

    let fechaFormateada = new Date(fecha);
    let mes = fechaFormateada.getMonth() + 1;
    document.querySelector(".fecha").innerHTML = fechaFormateada.getDate() + " / " + mes + " / " + fechaFormateada.getFullYear();

}

function comprobarAmigos(comprobante) {
    let botonAmigos = document.querySelector(".hacerseAmigos");
    let botonEditar = document.querySelector(".editar");

    if (comprobante == "Ya sois amigos") {
        botonAmigos.classList.add("none");;
        botonAmigos.classList.remove("btn-success");
        botonAmigos.classList.add("btn-primary");
        botonAmigos.innerHTML = "Ya sois amigos"



    } else if (comprobante == "Sois la misma persona!") {
        botonEditar.classList.remove("none");
    } else {
        botonEditar.classList.remove("none");
    }
}

function changeImage() {

    var listaimg = ["/img/backgrounds/futbol.jpg", "/img/backgrounds/basket.jpg", "/img/backgrounds/running.jpg", "/img/backgrounds/tenis.jpg", "/img/backgrounds/beisbol.jpg", "/img/backgrounds/padel.jpg", "/img/backgrounds/senderismo.jpg"];

    let random = Math.floor(Math.random() * (6 - 0)) + 0;
    console.log("random" + random);

    let contenedor = document.querySelector(".contenedor");
    contenedor.style.backgroundImage = "url(" + listaimg[random] + ")";

}

window.onload = init;