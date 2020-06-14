function init(params) {
    let comprobante = document.querySelector(".comprobante").innerHTML;
    comprobarAmigos(comprobante);

}

function comprobarAmigos(comprobante) {
    let botonAmigos = document.querySelector(".hacerseAmigos");
    if (comprobante == "Ya sois amigos") {
        botonAmigos.disabled = true;
        botonAmigos.classList.remove("btn-success");
        botonAmigos.classList.add("btn-primary");
        botonAmigos.innerHTML = "Ya sois amigos"
    } else {
        botonAmigos.disabled = false;
    }
}

window.onload = init;