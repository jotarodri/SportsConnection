const eventosCtrl = {};

const pool = require('../database');

eventosCtrl.renderAddEvento = (req, res) => {
    res.render('eventos/add');
};

eventosCtrl.addEvento = async(req, res) => {
    const { titulo, tipodeporte, nparticipantes, day, month, year, hour, password, description } = req.body;
    let acaba_el = day + "/" + month + "/" + year + " - " + hour;
    const newLink = {
        titulo,
        tipodeporte,
        nparticipantes,
        acaba_el,
        password,
        description,
        user_id: req.user[0].id
    };
    await pool.query('INSERT INTO eventos set ?', [newLink]);
    req.flash('success', 'Evento Creado Correctamente');
    res.redirect('/eventos');


}

eventosCtrl.renderEventos = async(req, res) => {
    const links = await pool.query('SELECT * FROM eventos WHERE user_id = ?', [req.user[0].id]);
    res.render('eventos/list', { links });
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

module.exports = eventosCtrl;