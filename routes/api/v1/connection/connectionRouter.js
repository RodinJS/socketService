const express = require('express');
const checkAppSecret = require('../../../../utils/middlewears/checkAppSecret.js');
const router = express.Router();

router.post('/', checkAppSecret, (req, res) => {
    console.log(req.app);
    res.end('asd');
});

module.exports = router;