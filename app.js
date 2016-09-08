const express = require('express');
const configs = require('./config/config.js');
const app = express();

app.listen(configs.server.port, () => {
    console.log('server start at port 1234');
});
