const userCtrl = {};
const { renderApp, getUsuariosUnidos } = require("./eventos.controller");
const pool = require('../database');


userCtrl.renderUserProfile = async(req, res, next) => {
    //console.log(req.params.id); ESTE ES EL ID DEL USUARIO CLICKADO
    idUsuarioClickado = req.params.id;
    const datosUsuario = await pool.query('SELECT * FROM usuarios WHERE id = ?', [idUsuarioClickado]);
    let usuario = datosUsuario[0];
    let comprobante = await comprobanteAmigos(idUsuarioClickado, req.user[0].id);

    res.render('./user', { usuario, comprobante });
}

userCtrl.renderApp = async(req, res, next) => {
    const links = await pool.query('SELECT * FROM eventos');
    res.render('./app', { links });
}

userCtrl.unirseEvento = async(req, res, next) => {

    let idUsuario = req.user[0].id; //Si me meto con otro usuario comprobar si cambia
    let idEvento = req.params.id;

    const unirse = await pool.query('SELECT * FROM unirse');

    let unido; //SI ES TRUE YA SE HA UNIDO || SI ES FALSE ES LA PRIMERA VEZ QUE TE UNES

    unirse.forEach(async element => {

        if (element.user_id == idUsuario && element.evento_id == idEvento) {

            unido = "true";

        } else {
            unido = "false";

        }

    });

    if (unido == "false") {
        await pool.query('INSERT INTO unirse (user_id, evento_id) VALUES (?,?)', [idUsuario, idEvento]);
    }
    unido = "true";

    const usuariosUnidos = await pool.query('SELECT * FROM unirse WHERE evento_id = ?', [req.params.id]);
    let users = [];
    let user;

    for (let i = 0; i < usuariosUnidos.length; i++) {
        user = await pool.query('SELECT id, username FROM usuarios WHERE id = ?', [usuariosUnidos[i].user_id]);
        users.push(user[0]);
        console.log(users[i].username);

    }


    await pool.query("UPDATE usuarios SET neventos=neventos+1 where id=? ", [idUsuario]);

    const links = await pool.query("SELECT * FROM eventos where id = ?", [idEvento])
    res.render('eventos/evento', { links, unido, users });

}

userCtrl.hacerseAmigos = async(req, res, next) => {
    let idAmigo = req.params.id;
    let idUsuario = req.user[0].id;

    let comprobante = await comprobanteAmigos(idAmigo, idUsuario);

    if (comprobante == undefined) {

        await pool.query("INSERT INTO amigos (user_id, amigo_id) VALUES (?,?)", [idUsuario, idAmigo]);
        await pool.query("INSERT INTO amigos (user_id, amigo_id) VALUES (?,?)", [idAmigo, idUsuario]);
    }
    console.log(comprobante);


    const datosUsuario = await pool.query('SELECT * FROM usuarios WHERE id = ?', [idAmigo]);
    let usuario = datosUsuario[0];
    res.render('./user', { usuario, comprobante });

}


module.exports = userCtrl;

async function comprobanteAmigos(idAmigo, idUsuario) {

    const todosAmigos = await pool.query("SELECT * FROM amigos WHERE user_id = ?", [idUsuario])
    let comprobante;
    todosAmigos.forEach(async element => {

        if (element.amigo_id == idAmigo) {
            comprobante = "Ya sois amigos";
        } else {

            comprobante = "";
        }

    });
    console.log(comprobante);

    return comprobante;
}