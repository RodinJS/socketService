const App = require('../../mongoose/connection.js').model('App');
const CustomErrors = require('../../utils/errors.js');
const Emiiter = require('../../utils/emitter/index.js');

module.exports = (req, res, next) => {
    const appId = req.body.appId;
    const appSecret = req.body.appSecret;
    const emitter = new Emiiter(req, res);

    App.findOne({appId: appId, appSecret: appSecret}, (err, app) => {
        if(err) {
            return emitter.sendNativeError(err);
        }

        if(!app) {
            return emitter.sendCustomError(new CustomErrors.InvalisAppIdOrSecret());
        }

        req.app = app.toObject({virtuals: true});
        next();
    });
};