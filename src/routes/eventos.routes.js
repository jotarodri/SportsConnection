const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');

const { renderAddEvento, addEvento, renderEventos, deleteEvento, editEvento, renderEditEvento } = require('../controllers/eventos.controller')

// Authorization
router.use(isLoggedIn);

// Routes

router.get('/add', renderAddEvento);
router.post('/add', addEvento);
router.get('/', isLoggedIn);
router.get('/delete/:id', deleteEvento);
router.get('/edit/:id', renderEditEvento);
router.post('/edit/:id', editEvento);


module.exports = router;