const userCtrl = {};
const { renderApp, getUsuariosUnidos } = require("./eventos.controller");
const pool = require('../database');


userCtrl.renderUserProfile = async(req, res, next) => {
    const links = await pool.query('SELECT * FROM eventos');
    res.render('./app', { links });
}

userCtrl.unirseEvento = async(req, res, next) => {

    let idUsuario = req.user[0].id; //Si me meto con otro usuario comprobar si cambia
    let idEvento = req.params.id;

    const unirse = await pool.query('SELECT * FROM unirse WHERE user_id = ?', [idUsuario]);

    let unido; //SI ES TRUE YA SE HA UNIDO || SI ES FALSE ES LA PRIMERA VEZ QUE TE UNES

    unirse.forEach(async element => {

        if (element.user_id == idUsuario && element.evento_id == idEvento) {

            unido = "true";

        } else {
            unido = "false";

        }

    });
    console.log("Voy a enviar" + unido);

    if (unido == "false") {
        await pool.query('INSERT INTO unirse (user_id, evento_id) VALUES (?,?)', [idUsuario, idEvento]);
    }
    unido = "true";



    await pool.query("UPDATE usuarios SET neventos=neventos+1 where id=? ", [idUsuario])

    const links = await pool.query("SELECT * FROM eventos where id = ?", [idEvento])
    res.render('eventos/evento', { links, unido, listaUsuarios });

}



module.exports = userCtrl;