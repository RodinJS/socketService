const controller = require('../../../controller');

const sharingPermission = (socket, data, next) => {
    let roomId = data.channel + '_r_' + data.room;
    if(controller.userJoinedRoom(data.channel, roomId, socket.uid)) {
        return next();
    }

    next(new Error('Unauthorised'));
};

module.exports = {
    sharing: sharingPermission
};