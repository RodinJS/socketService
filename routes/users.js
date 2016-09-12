class Users {
    constructor() {
        let users = [];
        this.users = () => users;

        setInterval(() => {
            this.removeInactiveUsers();
        }, 5000)
    };

    add(token, info) {
        let users = this.users();
        if (this.findUserByToken(token)) {
            return;
        }

        const opentok = require("../utils/audioStream").opentok;
        const sessionID = require("../utils/audioStream").sessionId;

        let tokenOptions = {
            role: 'publisher',
            expireTime: (new Date().getTime() / 1000) + (7 * 24 * 60 * 60),
            data: `token=${token}`
        };

        let user = {
            token: token,
            info: info,
            stream: {
                sessionId: sessionID,
                token: opentok.generateToken(sessionID, tokenOptions)
            },
            last_action: Date.now()
        };

        users.push(user);
        return user;
    }

    remove(token) {
        let users = this.users();
        let index = this.findUserByToken(token);
        if (index !== -1) {
            users.splice(i, 1);
        }
    };

    findUserByToken(token) {
        let users = this.users();
        if (token instanceof Array) {
            return token.map(t => {
                for (let i = 0; i < users.length; i++) {
                    if (users[i].token === t) {
                        return users[i];
                    }
                }
            })
        } else {
            for (let i = 0; i < users.length; i++) {
                if (users[i].token === token) {
                    return users[i];
                }
            }
        }

        return null;
    };

    actionFromUser(token) {
        let user = this.findUserByToken(token);
        user && (user.last_action = Date.now());
    };

    setSocket(socket) {
        let users = this.users();
        for (let i = 0; i < users.length; i++) {
            if (users[i].token == socket.uid) {
                users[i].socket = socket;
            }
        }
    };

    removeInactiveUsers() {
        let users = this.users();
        for (let i = 0; i < users.length; i++) {
            if (Date.now() - users[i].last_action > 5 * 60 * 1000 /* 5 minutes */) {
                users[i].socket && users[i].socket.disconnect();
                users.splice(i, 1);
                return this.removeInactiveUsers();
            }
        }
    };
}

const instance = new Users();

module.exports = instance;