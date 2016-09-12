const OpenTok = require('opentok');
const config = require('../config/config');

const opentok = new OpenTok(config.audioStream.apiKey, config.audioStream.apiSecret);

module.exports.init = cb => opentok.createSession((err, session) => {
    if (err) {
        return cb(err);
    }

    module.exports.sessionId = session.sessionId;
    module.exports.opentok = opentok;
    return cb();
});