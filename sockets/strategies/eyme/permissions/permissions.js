const sharingPermission = (socket, data, next) => {
    next();
};

module.exports = {
    sharing: sharingPermission
};