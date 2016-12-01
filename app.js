let app = require('http').createServer(handler);
let io = require('socket.io')(app);

function handler (req, res) {
    res.writeHead(200);
    res.end('hello');
}

let rooms = {};
function resolvedata (socket, data) {
    return {
        data,
        from: socket.id
    }
}

io.on('connection', function (socket) {
    socket.on('subscribe', function (data) {
        if (!rooms[data.roomId]) {
            rooms[data.roomId] = []
        }

        data.socketId = socket.id;
        rooms[data.roomId].push(data);
        socket.join(data.roomId);
        io.to(data.roomId).emit('newConnection', resolvedata(socket, data));
    });

    socket.on('event', function (data) {
        if (!rooms[data.roomId]) {
            return socket.emit('error', 'unknown room');
        }

        io.to(data.roomId).emit(data.event, resolvedata(socket, data));
    });

    socket.on('disconnect', function () {
        for(let i in rooms) {
            let room = rooms[i];

            for(let j = 0; i < room.length; j ++) {
                if(room[j].socketId === socket.id) {
                    let user = room.splice(j, 1);
                    io.to(i).emit('logout', user);
                }
            }
        }
    });

    socket.on('logout', function () {
        socket.disconnect();
    });
});

app.listen(1234);
