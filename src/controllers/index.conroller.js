const indexCtrl = {};
const pool = require('../database');

indexCtrl.renderIndex = (req, res) => {
    res.render('auth/signin');
};




module.exports = indexCtrl;