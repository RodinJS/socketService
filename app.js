const express = require('express');
const configs = require('./config/config.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();

let dbConnected = false;

app.use(cors());
app.use(helmet({
    frameguard: {
        action: 'allow-from',
        domain: ''
    }
}));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(path.join(__dirname + '/public')));

if (configs.envirement.development) {
    app.use(morgan("dev"));
}

let startServer = () => {
    if (!dbConnected) {
        return;
    }

    require('./routes/setupRoutes.js')(app);
    app.listen(configs.server.port, () => {
        console.log('server start at port 1234');
    });
};

let connectDB = () => {
    const dbConnection = require('./mongoose/connection.js');
    dbConnection.once('open', () => {
        dbConnected = true;
        require('./mongoose/models.js')(dbConnection);
        startServer();
    });
};

connectDB();