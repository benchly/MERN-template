const express = require('express');
const router = express.Router();

//basic account management
router.post('/signup', require('./signup'));
router.get('/validation', require('./validation'));
router.post('/login', require('./login'));

module.exports = router;