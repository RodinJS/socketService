"use strict";

const users = require("../../../../routes/users");

module.exports = (socket, next) => {
    let handshakeData = socket.handshake;

    let token = handshakeData.query['x-access-token'];
    if (!token) {
        return next(new Error('Not authorized'));
    }

    let user = users.findOrCreate(token, info);
    if(!user) {
        return next(new Error("Token not found"));
    }

    socket.uid = token;
    socket.user = user;
    next();
};