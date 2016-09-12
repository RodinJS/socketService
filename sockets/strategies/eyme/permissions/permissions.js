"use strict";

const spacePermission = (socket, data, next) => {
    next();
};

module.exports = {
    space: spacePermission
};