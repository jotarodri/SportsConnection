let unido;

function listeners() {
    let boton = document.querySelector(".unirseEvento");
    boton.addEventListener("click", cambiarBoton);
}

function cambiarEstilo() {
    console.log("Hola " + unido);
    let boton = document.querySelector(".unirseEvento");
    if (unido == "true") {
        //boton.classList.add("unido");
        boton.disabled = true;
        console.log("BLOQUEADO");


    }
    if (unido == "false") {
        // boton.classList.remove("unido");
        boton.disabled = false;
        console.log("DESBLOQUEADO");
    }


}

function cambiarBoton() {


    if (unido == "true") {
        boton.classList.remove("btn");
        this.disabled = true;

    }
}

function cambiarL(params) {

}


function init() {

    unido = document.querySelector(".eventoUnido").innerHTML;
    cambiarEstilo();
    let usuariosUnidos = document.getElementsByClassName(".usuariosUnidos")[0];
    console.log(usuariosUnidos);


}

window.onload = init;