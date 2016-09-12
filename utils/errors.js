class ResponseError {
    constructor(message) {
        this.message = message;
        this.timestamp = Date.now();
    }
}

module.exports.InvalisAppIdOrSecret = class InvalisAppIdOrSecret extends ResponseError {
    constructor() {
        super(`Invalid appId or appSecret`);
    }
};

module.exports.InvalidRequestData = class InvalidRequestData extends ResponseError {
    constructor() {
        super(`Invalid request data. Check api documentation`);
    }
};