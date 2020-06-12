const express = require('express');
const router = express.Router();

const { renderIndex, renderApp } = require('../controllers/index.conroller');



router.get('/', renderIndex);

router.get('/app', renderApp);

module.exports = router;