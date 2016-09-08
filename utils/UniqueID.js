module.exports = class UniqueID extends String {
    constructor() {
        super(UniqueID.generate());
    }

    static v4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    static v8() {
        return `${UniqueID.v4() + UniqueID.v4()}`;
    }

    static v16() {
        return `${UniqueID.v8() + UniqueID.v8()}`;
    }

    static generate() {
        return `${UniqueID.v8()}-${UniqueID.v4()}-${UniqueID.v4()}-${UniqueID.v4()}-${UniqueID.v8()}`;
    }
};