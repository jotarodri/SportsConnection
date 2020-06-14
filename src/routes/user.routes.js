const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../lib/auth');
const { renderUserProfile, unirseEvento } = require('../controllers/user.controller');

router.get('/app', isLoggedIn, renderUserProfile);
router.post('/evento/:id', isLoggedIn, unirseEvento);

module.exports = router;