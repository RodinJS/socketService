module.exports.strategy = {
    supportedChannels: require("./channels").channels,
    supportedActions: require("./channels").actions,
    authorize: require("./authorize/authorize"),
    permissions: require("./permissions/permissions"),
    eventHandlers: require("./eventHandlers/eventHandlers")
};