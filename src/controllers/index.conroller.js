const indexCtrl = {};
const pool = require('../database');
indexCtrl.renderIndex = (req, res) => {
    res.render('index');
};

indexCtrl.renderApp = async(req, res) => {
    const links = await pool.query('SELECT * FROM eventos');
    res.render('app', { links });
};

module.exports = indexCtrl;