"use strict";

const controller = require("../../../controller");

const spaceEventHandler = function () {
    const shareData = (namespace, socket, roomId, data, next) => {
        namespace.sendToRoom(roomId, "data", {
            channel: data.channel,
            data: {
                actionUser: socket.uid,
                body: data
            },
        })
    };

    return {
        shareData: shareData
    }
};

module.exports = {
    space: new spaceEventHandler()
};
