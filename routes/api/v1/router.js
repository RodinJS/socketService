const express = require('express');
const router = express.Router();

router.use('/connection', require('./connection/connectionRouter.js'));

module.exports = router;