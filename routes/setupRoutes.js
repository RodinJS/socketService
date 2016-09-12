const path = require("path");
const requestLogger = require('../logger/requestLoggerMiddlewear');

module.exports = app => {
    app.use('/', requestLogger);
    app.use('/api/v1', require('./api.v1/apiRouter'));
};
