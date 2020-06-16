const eventosCtrl = {};

const pool = require('../database');

eventosCtrl.renderAddEvento = (req, res) => {
    res.render('eventos/add');
};

eventosCtrl.addEvento = async(req, res) => {

    let { titulo, tipodeporte, nparticipantesMAX, day, month, year, hora, password, description, municipio, inputLongitud, inputLatitud, comunidad } = req.body;
    let fecha = year + "-" + month + "-" + day;
    let direccion = inputLatitud + " / " + inputLongitud;
    let nparticipantes = "1";

    if (municipio == "VALENCIA/VALÈNCIA") {
        municipio = "VALENCIA"
    }
    console.log(direccion);

    const newLink = {
        titulo,
        tipodeporte,
        description,
        nparticipantes,
        nparticipantesMAX,
        password,
        fecha,
        hora,
        municipio,
        direccion,
        user_id: req.user[0].id,
        comunidad
    };
    const result = await pool.query('INSERT INTO eventos set ?', [newLink]);
    newLink.id = result.insertId;
    req.flash('success', 'Evento Creado Correctamente');

    const links = await pool.query('SELECT * FROM eventos WHERE comunidad = ?', [comunidad]);

    await pool.query('INSERT INTO unirse (user_id, evento_id) VALUES (?,?)', [req.user[0].id, newLink.id]);

    res.render('./app', { links });


}

eventosCtrl.renderEventos = async(req, res) => {

    const links = await pool.query('SELECT * FROM eventos');
    return links;


}

eventosCtrl.renderApp = async(req, res) => {
    const comunidad = await pool.query('SELECT comunidad FROM usuarios WHERE id = ?', [req.user[0].id]);
    console.log(comunidad.toUpperCase());

    const links = await pool.query('SELECT * FROM eventos WHERE comunidad = ?', [comunidad.toUpperCase()]);
    res.render('./eventos/app', { links });

};

eventosCtrl.deleteEvento = async(req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM eventos WHERE ID = ?', [id]);
    req.flash('success', 'Evento Borrado Correctamente');
    res.redirect('/eventos');
};

eventosCtrl.renderEditEvento = async(req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM eventos WHERE id = ?', [id]);
    console.log(links);
    res.render('eventos/edit', { link: links[0] });
};

eventosCtrl.editEvento = async(req, res) => {
    const { id } = req.params;
    const { title, description, url } = req.body;
    const newLink = {
        title,
        description,
        url
    };
    await pool.query('UPDATE eventos set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Evento Actualizado Correctamente');
    res.redirect('/eventos');
}

eventosCtrl.getEventos = async(req, res) => {
    const links = await pool.query('SELECT * FROM eventos');
    return links;
}

eventosCtrl.renderEventoIndividual = async(req, res) => {

    const unirse = await pool.query('SELECT * FROM unirse WHERE user_id = ?', [req.user[0].id]);
    let unido; //SI ES TRUE YA SE HA UNIDO || SI ES FALSE ES LA PRIMERA VEZ QUE TE UNES

    unirse.forEach(async element => {

        if (element.user_id == req.user[0].id && element.evento_id == req.params.id) {

            unido = "true";

        } else {
            unido = "false";

        }

    });

    const usuariosUnidos = await pool.query('SELECT * FROM unirse WHERE evento_id = ?', [req.params.id]);
    let users;

    for (let i = 0; i < usuariosUnidos.length; i++) {


        users = await pool.query('SELECT id, username FROM usuarios WHERE id = ?', [usuariosUnidos[i].user_id]);
    }


    const links = await pool.query('SELECT * FROM eventos WHERE id = ?', [req.params.id]);
    const nombre = await pool.query('SELECT username FROM usuarios WHERE id = ?', [req.user[0].id]);

    const todosLosComents = await pool.query('SELECT * FROM comentarios WHERE evento_id = ?', [req.params.id]);
    const comentarios = await pool.query('SELECT mensaje FROM comentarios WHERE evento_id = ?', [req.params.id]);
    let usuariosComent;
    for (let i = 0; i < todosLosComents.length; i++) {
        const usuarios = await pool.query('SELECT username FROM usuarios WHERE id = ?', [todosLosComents[i].user_id]);
        usuariosComent = usuarios;

    }


    console.log(usuariosComent);

    res.render('eventos/evento', { links, unido, users, nombre, comentarios, usuariosComent });

}

eventosCtrl.comentarEvento = async(req, res) => {

    const { idEvento } = req.body;
    const { comentario } = req.body;
    const idUser = req.user[0].id;

    await pool.query('INSERT INTO comentarios(user_id, evento_id, mensaje) VALUES(?,?,?)', [idUser, idEvento, comentario]);

    const todosLosComents = await pool.query('SELECT * FROM comentarios WHERE evento_id = ?', [idEvento]);
    //  const nombres = await pool.query('SELECT username FROM usuarios WHERE id = ?', [todosLosComents.user_id]);
    let comentarios = [];
    const coments = await pool.query('SELECT mensaje FROM comentarios WHERE evento_id = ?', [idEvento]);
    console.log(coments);
    let nombres;
    for (let i = 0; i < todosLosComents.length; i++) {
        let nombres = await pool.query('SELECT id,username FROM usuarios WHERE id = ?', [todosLosComents[i].user_id]);
        console.log(nombres);
    }
    res.render('eventos/evento', { links, unido, users, nombre });

}

module.exports = eventosCtrl;