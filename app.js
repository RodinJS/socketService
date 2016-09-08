const express = require('express');
const configs = require('./config/config.js');
const app = express();

let dbConnected = false;

let startServer = () => {
    if(!dbConnected) {
        return;
    }

    app.listen(configs.server.port, () => {
        console.log('server start at port 1234');
    });
};

let connectDB = () => {
    const dbConnection = require('./mongoose/connection.js');
    dbConnection.on('ready', () => {
        dbConnected = true;
        startServer();
    });
    require('./mongoose/models.js')(dbConnection);
};

connectDB();