const io = require('socket.io');
const controller = require('./controller');
const users = require('../routes/users');
const Logger = require('../logger/Logger');

let strategy;
let namespace;
let logger = new Logger("sockets/sockets.log", false);

module.exports.init = (server, _strategy) => {
    controller.deserialize();
    strategy = _strategy;
    namespace = require('socket.io')(server);
    namespace.use(_strategy.authorize);
    namespace.on('connection', onConnection);

    namespace.sendToRoom = function (room, emitText, emitObject) {
        namespace.to(room).emit(emitText, emitObject);
    };
};

const onConnection = socket => {
    logger.info("Connected: " + socket.id);
    users.setSocket(socket.uid);

    socket.join('uid_' + socket.userId);

    /**
     * Custom error sender
     * @param err
     */
    socket.sendError = (err) => {
        namespace.to("uid_" + socket.userId).emit("error", err);
    };

    /**
     * event handler
     */
    socket.on('event', function (data) {
        // console.log(`socket from ${socket.uid} \tchannel: ${data.channel} \taction: ${data.data.action}`);
        if (!checkChannel(data) || !checkAction(data)) {
            return;
        }

        let handler = strategy.eventHandlers[data.channel][data.data.action];
        let roomId = data.channel + "_r_" + data.room;
        users.actionFromUser(socket.uid);

        handler(namespace, socket, roomId, data, (err) => {
            if (err) {
                return socket.sendError(err);
            }
        });
    });


    /**
     * Subscribe user to room
     * Check permission before subscribing
     * Also subscribe user to Controller
     */
    socket.on('subscribe', (data) => {
        if (!checkChannel(data)) {
            return;
        }

        let permission = strategy.permissions[data.channel];

        permission(socket, data, err => {
            if (err) {
                return socket.sendError(err);
            }

            let roomId = data.channel + "_r_" + data.room;

            socket.join(roomId);
            namespace.sendToRoom(roomId, "userenter", {
                channel: data.channel,
                data: {
                    actionUser: socket.uid,
                    room: controller.getRoom(data.channel, roomId)
                }
            });
        });
    });


    /**
     * UnSubscribe user from channel
     * Also Unsubscribe user from controller
     */
    socket.on('unsubscribe', data => {
        let roomId = data.channel + "_r_" + data.room;
        controller.unsubscribe(data.channel, roomId, socket.uid);
        users.remove(socket.uid);
        namespace.sendToRoom(roomId, "userleave", {
            channel: data.channel,
            data: {
                actionUser: socket.uid,
                room: controller.getRoom(data.channel, roomId)
            }
        });
        socket.leave(roomId, () => {});
        socket.leave("uid_" + socket.uid, () => {});
        logger.info("Disconnected: " + socket.id);
    });


    /**
     * Disconnect handler
     * Unsubscribe user from all channels
     */
    socket.on('disconnect', function () {
        socket.leave("uid_" + socket.uid, () => {});
        let roomsId = controller.unsubscribeFromAllRooms(socket.uid);
        for (let i = 0; i < roomsId.length; i++) {
            namespace.sendToRoom(roomsId[i].roomId, "userleave", {
                channel: roomsId[i].channel,
                data: {
                    actionUser: socket.uid,
                    room: roomsId[i].room
                }
            });
            socket.leave(roomsId[i].roomId, () => {});
        }
    });


    /**
     * Logout handler
     * Disconnect socket on logout
     */
    socket.on('logout', function () {
        socket.disconnect();
    });


    /**
     * check if channel is supported.
     * send error message if channel is not supported and return false, otherwise return true
     * @param data
     * @returns {boolean}
     */
    const checkChannel = data => {
        // if (strategy.supportedChannels.indexOf(data.channel) === -1) {
        //     socket.sendError(new Error("Unknown channel"));
        //     return false;
        // }
        return true;
    };


    /**
     * check if action is supported for channel
     * send error message if action is not supported and return false, otherwise return true
     * @param data
     * @returns {boolean}
     */
    const checkAction = data => {
        // if (strategy.supportedActions[data.channel].indexOf(data.data.action) === -1) {
        //     socket.sendError(new Error("Unknown action"));
        //     return false;
        // }
        return true;
    };
};