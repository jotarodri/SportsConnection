const bcrypt = require('bcryptjs');

const helpers = {};
const eventosCtrl = require("../controllers/eventos.controller");
let eventos;
helpers.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

helpers.matchPassword = async(password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (e) {
        console.log(e)
    }
};

helpers.getEventos = async(req, res) => {
    eventos = eventosCtrl.getEventos();
    console.log(eventos);

};

module.exports = helpers;