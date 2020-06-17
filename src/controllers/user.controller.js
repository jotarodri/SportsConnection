const userCtrl = {};
const { renderApp } = require("./eventos.controller");
const pool = require('../database');


userCtrl.renderUserProfile = async(req, res, next) => {
    //ESTE ES EL ID DEL USUARIO CLICKADO
    let idUsuarioClickado = req.params.id;
    console.log(idUsuarioClickado);

    const datosUsuario = await pool.query('SELECT * FROM usuarios WHERE id = ?', [idUsuarioClickado]);
    let usuario = datosUsuario[0];

    res.render('./user/user', { usuario });
}

userCtrl.unirseEvento = async(req, res, next) => {

    let idUsuario = req.user[0].id; //Si me meto con otro usuario comprobar si cambia
    let idEvento = req.body.id;

    console.log(idEvento);


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
    await pool.query("UPDATE eventos SET nparticipantes = nparticipantes+1 WHERE id = ?", [idEvento]);

    const usuariosUnidos = await pool.query('SELECT * FROM unirse WHERE evento_id = ?', [req.params.id]);

    let users = [];
    let user;

    for (let i = 0; i < usuariosUnidos.length; i++) {
        user = await pool.query('SELECT id, username FROM usuarios WHERE id = ?', [usuariosUnidos[i].user_id]);
        users.push(user[0]);
        console.log(users[i].username);

    }


    await pool.query("UPDATE usuarios SET neventos=neventos+1 where id=? ", [idUsuario]);

    const links = await pool.query("SELECT * FROM eventos where id = ?", [idEvento]);
    console.log(links);

    res.render('./eventos/evento', { links, unido, users });

}

userCtrl.renderMisEventos = async(req, res, next) => {

    /*const eventosCreados = await pool.query('SELECT evento_id FROM unirse WHERE user_id = ?', [req.user[0].id]);
    console.log(eventosCreados);*/
    const eventos = await pool.query('SELECT * FROM eventos WHERE user_id = ?', [req.user[0].id]);


    /*const eventosUnidos = await pool.query('SELECT * FROM eventos WHERE id = ?', [idEvento]);
     */
    res.render('./user/eventos', { eventos });
}

userCtrl.renderApp = async(req, res) => {
    const comunidad = await pool.query('SELECT comunidad FROM usuarios WHERE id = ?', [req.user[0].id]);
    console.log(comunidad[0].comunidad);
    let comunidadUser = comunidad[0].comunidad;

    const links = await pool.query('SELECT * FROM eventos WHERE comunidad = ?', [comunidadUser]);

    res.render('./app', { links });

};

module.exports = userCtrl;