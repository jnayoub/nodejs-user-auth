const express = require('express');
const path = require('path');
const router = express.Router();

router.use('/', express.static(path.join(__dirname, '../../client'), {index: 'pages/home.html'}));
router.use('/login', express.static(path.join(__dirname, '../../client'), {index: 'pages/login.html'}));
router.use('/register', express.static(path.join(__dirname, '../../client'), {index: 'pages/register.html'}));
router.use('/auth', express.static(path.join(__dirname, '../../client'), {index: 'pages/auth.html'}));

module.exports = router;
