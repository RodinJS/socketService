"use strict";

const users = require("../../../../routes/users");

module.exports = (socket, next) => {
    var handshakeData = socket.handshake;

    let token = handshakeData.query['x-access-token'];
    if (!token) {
        return next(new Error('Not authorized'));
    }

    var user = users.findUserByToken(token);
    if(!user) {
        return next(new Error("Token not found"));
    }

    socket.uid = token;
    socket.user = user;
    next();
};