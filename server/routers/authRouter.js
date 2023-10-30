const express = require('express');
const router = express.Router();

const addUser = require('../endpoints/addUser');
const getUser = require('../endpoints/getUser');
const checkAuth = require('../endpoints/checkAuth');

router.use('/addUser', addUser);
router.use('/getUser', getUser);
router.use('/checkAuth', checkAuth);

module.exports = router;
