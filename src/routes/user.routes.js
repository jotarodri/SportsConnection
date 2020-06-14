const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');
const { renderUserProfile, unirseEvento, hacerseAmigos } = require('../controllers/user.controller');

//router.get('/app', isLoggedIn, renderUserProfile);
router.post('/evento/:id', isLoggedIn, unirseEvento);
router.get('/user/:id', isLoggedIn, renderUserProfile);
router.post('/user/:id', isLoggedIn, hacerseAmigos);

module.exports = router;