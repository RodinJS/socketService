const App = require('../../mongoose/connection').model('App');
const CustomErrors = require('../errors');
const Emitter = require('../emitter');

module.exports = (req, res, next) => {
    const appId = req.body.appId;
    const appSecret = req.body.appSecret;
    const emitter = new Emitter(req, res);

    App.findOne({appId: appId, appSecret: appSecret}, (err, app) => {
        if(err) {
            return emitter.sendError(err);
        }

        if(!app) {
            return emitter.sendError(new CustomErrors.InvalisAppIdOrSecret());
        }

        req.app = app.toObject({virtuals: true});
        next();
    });
};