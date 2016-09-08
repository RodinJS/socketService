const winston = require('winston');
const fs = require('fs-extra');
const path = require('path');
const configs = require('../config/config.js');

module.exports = class Logger {

    /**
     * @param {string} _path
     * @param {boolean} _console
     */
    constructor(_path, _console) {
        const logPath = path.join(__dirname, '../logs/', _path);

        try {
            fs.statSync(logPath);
        } catch (ex) {
            fs.createFileSync(logPath);
        }

        let transports = [
            new winston.transports.File({filename: logPath})
        ];

        if(_console !== false && configs.envirement.development) {
            transports.push(new winston.transports.Console());
        }

        let logger = new winston.Logger({
            transports: transports,
            maxsize: configs.log.maxsize
        });

        logger.info(`Logs started at ${Date.now()}`);
    };
};