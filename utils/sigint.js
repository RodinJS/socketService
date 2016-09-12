const socketController = require("../sockets/controller");

module.exports = () => {
    return () => {
        socketController.serialize();
    }
};