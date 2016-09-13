class ResponseError {
    /**
     * @param {string} type
     * @param {number} status
     * @param {string} message
     */
    constructor(type, status, message) {
        this.message = message;
        this.status = status;
        this.timestamp = Date.now();
        this.type = type;
    }
}

module.exports.InvalisAppIdOrSecret = class InvalisAppIdOrSecret extends ResponseError {
    constructor() {
        super(`Authorisation Error`, 401, `Invalid appId or appSecret`);
    }
};

module.exports.InvalidRequestData = class InvalidRequestData extends ResponseError {
    constructor() {
        super(`Bad Request`, 400, `Invalid request data. Check api documentation`);
    }
};