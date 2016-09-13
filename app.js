const express = require("express");
const SIGINT = require("./utils/sigint");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const methodOverride = require('method-override');
const morgan = require("morgan");
const path = require("path");
const audioStream = require("./utils/audioStream");
const configs = require('./config/config');
const async = require('async');

const app = express();

/**
 * setup middlewears
 */
app.use(cors());
app.use(helmet());
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(path.join(__dirname + '/public')));

if (configs.envirement.development) {
    app.use(morgan("dev"));
}

const connectDB = cb => {
    const connection = require('./mongoose/connection');
    connection.once('open', () => {
        require('./mongoose/models')(connection);
        cb();
    })
};

async.parallel(
    [
        connectDB,
        audioStream.init
    ],
    err => {
        if (err) {
            console.log(err);
            process.exit(0);
        }

        require("./routes/setupRoutes")(app);

        const server = app.listen(configs.server.port, '0.0.0.0', () => {
            console.log(`Server running on port ${configs.server.port}`);
            require("./sockets").init(server, require("./sockets/strategies/eyme/eymeStrategy").strategy);
        });
    }
);