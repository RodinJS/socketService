const router = require('express').Router();
const Emitter = require('../../utils/emitter');
const UniqueID = require('../../utils/UniqueID');
const users = require('../users');

const MongoConnection = require('../../mongoose/connection');
const App = MongoConnection.model('App');

router.post('/connect', (req, res) => {
    const emitter = new Emitter(req, res);
    const token = UniqueID.generate();

    const user = users.add(token, req.body.user);
    user.appId = req.body.appId;

    return emitter.sendData({
        user: user,
        token: token
    });
});

module.exports = router;