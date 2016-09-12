const router = require('express').Router();
const CustomErrors = require('../../utils/errors');
const Emitter = require('../../utils/emitter');
const UniqueID = require('../../utils/UniqueID');
const users = require('../users');

const MongoConnection = require('../../mongoose/connection');
const App = MongoConnection.model('App');

router.post('/connect', (req, res) => {
    const emitter = new Emitter(req, res);
    const token = UniqueID.generate();

    App.findOne({appId: req.body.appId, appSecret: req.body.appSecret}, (err, app) => {
        if (err || !app) {
            return emitter.sendCustomError(new CustomErrors.InvalisAppIdOrSecret());
        }

        const user = users.add(token, req.body.user);
        user.appId = req.body.appId;

        return emitter.sendData({
            user: user,
            token: token
        })
    });
});

module.exports = router;