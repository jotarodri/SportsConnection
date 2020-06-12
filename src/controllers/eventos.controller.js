const eventosCtrl = {};

const pool = require('../database');
const { renderApp } = require('./index.conroller');

eventosCtrl.renderAddEvento = (req, res) => {
    res.render('eventos/add');
};

eventosCtrl.addEvento = async(req, res) => {
    const { titulo, tipodeporte, nparticipantesMAX, day, month, year, hora, password, description, municipio, inputLongitud, inputLatitud, comunidad } = req.body;
    let fecha = year + "-" + month + "-" + day;
    let direccion = inputLatitud + " - " + inputLongitud;
    let nparticipantes = "1";

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
    //res.redirect('/app', { result });


}

eventosCtrl.renderEventos = async(req, res) => {

    const links = await pool.query('SELECT * FROM eventos');
    return links;


}


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

module.exports = eventosCtrl;