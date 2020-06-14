let unido;
let usuarios = [];
let usuariosComunidad = [];

function listeners() {
    let boton = document.querySelector(".unirseEvento");
    boton.addEventListener("click", cambiarBoton);

    let usuarios = document.querySelectorAll(".usuariosUnidos");
    usuarios.forEach(element => {
        element.addEventListener("click", irAlPerfil)
    });


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

function getUsuarios() {
    let usuariosUnidos = document.querySelectorAll(".usuario").length;
    let id = document.querySelectorAll(".idUnidos");
    let nombreUsuario = document.querySelectorAll(".usuariosUnidos");
    console.log(usuariosUnidos);



    for (let i = 0; i < usuariosUnidos; i++) {

        let usuario = {
            "id": id[i].innerHTML,
            "nombre": nombreUsuario[i].innerHTML,
        };
        usuarios.push(usuario);
    }
    console.log(usuarios);

}


function irAlPerfil() {
    console.log("has hecho click");

    let usuarioClickado = this.innerHTML;

    usuarios.forEach(element => {
        if (usuarioClickado == element.nombre) {
            window.location = "/user/" + element.id;
        }
    });

}

function init() {
    listeners();
    unido = document.querySelector(".eventoUnido").innerHTML;
    cambiarEstilo();
    getUsuarios();
}

window.onload = init;