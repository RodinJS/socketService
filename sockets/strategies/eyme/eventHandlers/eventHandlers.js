"use strict";

const controller = require("../../../controller");

const sharingEventHandler = function () {
    const dataHandler = (namespace, socket, roomId, data, next) => {
        namespace.sendToRoom(roomId, "data", {
            channel: data.channel,
            data: {
                actionUser: socket.uid,
                body: data
            },
        })
    };

    return {
        data: dataHandler
    }
};

module.exports = {
    sharing: new sharingEventHandler()
};
