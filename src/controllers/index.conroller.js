const indexCtrl = {};
const pool = require('../database');

indexCtrl.renderIndex = (req, res) => {
    res.render('index');
};




module.exports = indexCtrl;