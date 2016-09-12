"use strict";

const path = require("path");
const users = require("./users");

module.exports = (app) => {
    app.use('/api/v1', require('./api.v1/apiRouter'));
};
