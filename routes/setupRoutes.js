const path = require("path");
const requestLogger = require('../logger/requestLoggerMiddlewear');
const checkAppSecret = require('../utils/middlewears/checkAppSecret');

module.exports = app => {
    app.use('/', requestLogger);
    app.use('/api/v1', checkAppSecret);
    app.use('/api/v1', require('./api.v1/apiRouter'));
};
