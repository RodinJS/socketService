const fs = require('fs');
const path = require('path');
const jsonPath = path.join(process.cwd(), "app/sockets/controller.json");

class Controller {
    constructor() {
        this.channels = {};
    }

    /**
     * subscribe user to room
     * @param {string} channel
     * @param {string} room
     * @param {string} uid
     * @param {Object} userInfo
     */
    subscribe = (channel, room, uid, userInfo) => {
        if (!this.channels[channel]) {
            this.channels[channel] = {};
        }

        if (!this.channels[channel][room]) {
            this.channels[channel][room] = {
                subscribers: [],
                state: null
            };
        }

        if (this.userIndexInRoom(channel, room, uid) === -1) {
            this.channels[channel][room].subscribers.push({uid: uid, user: userInfo});
        }
    };

    /**
     * unsubscribe user from room
     * @param {string} channel
     * @param {string} room
     * @param {string} uid
     */
    unsubscribe = (channel, room, uid) => {
        if (this.channels[channel] && this.channels[channel][room]) {
            let index = this.userIndexInRoom(channel, room, uid);
            if (index !== -1) {
                this.channels[channel][room].subscribers.splice(index, 1);
            }
        }
    };

    /**
     * unsubscribe user from all rooms
     * @param {string} uid
     * @return {object}
     */
    unsubscribeFromAllRooms = uid => {
        let retData = [];
        for (let c in this.channels) {
            for (let r in this.channels[c]) {
                let index = this.userIndexInRoom(c, r, uid);
                if (index !== -1) {
                    this.channels[c][r].subscribers.splice(index, 1);
                    retData.push({
                        channel: c,
                        roomId: r,
                        room: this.getRoom(c, r)
                    });
                }
            }
        }

        return retData;
    };

    /**
     * get channel
     * @param channel
     */
    getChannel = channel => this.channels[channel];

    /**
     * get room
     * @param channel
     * @param room
     */
    getRoom = (channel, room) => {
        return this.channels[channel][room];
    };

    /**
     * user index in channel
     * @param channel
     * @param room
     * @param uid
     * @returns {number} user index in room, -1 if user is not subscribed to room
     */
    userIndexInRoom = (channel, room, uid) => {
        for (let i = 0; i < this.channels[channel][room].subscribers.length; i++) {
            if (this.channels[channel][room].subscribers[i].uid.toString() === uid.toString()) {
                return i;
            }
        }

        return -1;
    };

    /**
     * deserialize channels
     * read from file if exists
     * @returns {boolean}
     */
    deserialize = () => {
        try {
            fs.accessSync(jsonPath, fs.F_OK);
            var dump = fs.readFileSync(jsonPath);
            this.channels = JSON.parse(dump).channels;
            return true;
        } catch (err) {
            console.log("Controller dump does not exist, creating new one");
            return false;
        }
    };

    /**
     * serialize channels
     * write to file
     */
    serialize = () => {
        try {
            fs.writeFileSync(jsonPath, JSON.stringify({
                date: Date.now(),
                channels: this.channels
            }, null, 2));
        } catch (err) {
            console.log("Error while serializing socket controller", err);
        }
    };
}