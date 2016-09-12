"use strict";

const fs = require("fs");
const path = require("path");
var jsonPath = path.join(process.cwd(), "app/sockets/controller.json");

/**
 * Class Controller
 *
 * Here saves all info about socket connection
 *
 * @constructor
 */
function Controller() {
    var channels = {};

    /**
     * subscribe user to room
     * @param channel
     * @param room
     * @param uid
     * @param userInfo
     */
    this.subscribe = (channel, room, uid, userInfo) => {
        if (!channels[channel]) {
            channels[channel] = {};
        }

        if (!channels[channel][room]) {
            channels[channel][room] = {
                subscribers: [],
                state: null
            };
        }

        if (this.userIndexInRoom(channel, room, uid) === -1) {
            channels[channel][room].subscribers.push({uid: uid, user: userInfo});
        }
    };

    /**
     * unsubscribe user from room
     * @param channel
     * @param room
     * @param uid
     */
    this.unsubscribe = (channel, room, uid) => {
        if (channels && channels[channel] && channels[channel][room]) {
            let index = this.userIndexInRoom(channel, room, uid);
            if (index !== -1) {
                channels[channel][room].subscribers.splice(index, 1);
            }
        }
    };

    /**
     * unsubscribe user from all rooms
     * @param uid
     * @return {object}
     */
    this.unsubscribeFromAllRooms = uid => {
        let retData = [];
        for (let c in channels) {
            for (let r in channels[c]) {
                let index = this.userIndexInRoom(c, r, uid);
                if (index !== -1) {
                    channels[c][r].subscribers.splice(index, 1);
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
    this.getChannel = channel => channels[channel];

    /**
     * get room
     * @param channel
     * @param room
     */
    this.getRoom = (channel, room) => {
        return channels[channel][room];
    };

    /**
     * user index in channel
     * @param channel
     * @param room
     * @param uid
     * @returns {number} user index in room, -1 if user is not subscribed to room
     */
    this.userIndexInRoom = (channel, room, uid) => {
        for (let i = 0; i < channels[channel][room].subscribers.length; i++) {
            if (channels[channel][room].subscribers[i].uid.toString() === uid.toString()) {
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
    this.deserialize = () => {
        try {
            fs.accessSync(jsonPath, fs.F_OK);
            var dump = fs.readFileSync(jsonPath);
            channels = JSON.parse(dump).channels;
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
    this.serialize = () => {
        try {
            fs.writeFileSync(jsonPath, JSON.stringify({
                date: Date.now(),
                channels: channels
            }, null, 2));
        } catch (err) {
            console.log("Error while serializing socket controller", err);
        }
    };
}

const controller = new Controller();
module.exports = controller;