const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');
const { renderUserProfile, unirseEvento, renderMisEventos } = require('../controllers/user.controller');
const { comentarEvento } = require('../controllers/eventos.controller');

//router.get('/app', isLoggedIn, renderUserProfile);


router.post('/unirse', isLoggedIn, unirseEvento);
router.get('/user/:id', isLoggedIn, renderUserProfile);

router.get('/eventos', isLoggedIn, renderMisEventos);
router.post('/comentar', comentarEvento);

module.exports = router;