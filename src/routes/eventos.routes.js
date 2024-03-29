const express = require('express');
const router = express.Router();


const { isLoggedIn } = require('../lib/auth');

const { renderApp, renderAddEvento, addEvento, deleteEvento, editEvento, renderEditEvento, renderEventoIndividual, comentarEvento } = require('../controllers/eventos.controller');
const { unirseEvento } = require('../controllers/user.controller');

// Authorization
router.use(isLoggedIn);

// Routes
router.get('/app', isLoggedIn, renderApp);
router.get('/add', renderAddEvento);
router.post('/add', addEvento);
//router.get('/', isLoggedIn);
router.get('/delete/:id', deleteEvento);
router.get('/edit/:id', renderEditEvento);
router.get('/:id', renderEventoIndividual);
router.post('/edit/:id', editEvento);
router.post('/unirse', unirseEvento);
router.post('/comentar', comentarEvento);

module.exports = router;