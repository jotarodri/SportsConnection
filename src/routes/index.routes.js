const express = require('express');
const router = express.Router();

const { renderIndex } = require('../controllers/index.conroller');
const { renderUserProfile, unirseEvento } = require('../controllers/user.controller');


router.get('/', renderIndex);

router.get('/app', renderUserProfile);

router.post('/unirse', unirseEvento);

module.exports = router;