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

    /*let idEvento = req.boyd.idEvento;

    await pool.query('INSERT INTO unirse (user_id, evento_id) VALUES (?,?)', [idUsuario, idEvento]);
    
    unido = "true";
    await pool.query("UPDATE eventos SET nparticipantes = nparticipantes+1 WHERE id = ?", [idEvento]);

    const usuariosUnidos = await pool.query('SELECT user_id FROM unirse WHERE evento_id = ?', [req.params.id]);

    let users = [];
    let user;
    */

 
    
    await pool.query("UPDATE eventos SET nparticipantes = nparticipantes+1 WHERE id = ?", [req.params.id]);
    await pool.query("UPDATE usuarios SET neventos=neventos+1 where id=? ", [req.user[0].id]);

    const newUser = await pool.query('SELECT * FROM usuarios WHERE id = ?', [usuariosUnidos[0].user_id]);

    const links = await pool.query("SELECT * FROM eventos where id = ?", [req.user[0].id]);
    
res.render('./eventos/evento'+idEvento, { links, newUser });

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