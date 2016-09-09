class ResponseError {
    constructor(message) {
        this.message = message;
    }
}

module.exports.InvalisAppIdOrSecret = class InvalisAppIdOrSecret extends ResponseError {
    constructor() {
        super(`Invalid appId or appSecret`);
    }
};