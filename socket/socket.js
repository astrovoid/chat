module.exports = function (server) {
    var io = require('socket.io')(server, {
        origins: 'localhost:*'
    });

    io.on('connection', function (socket) {
        socket.on('join to chat', function (username) {
            socket.join('all', function () {
                socket.to('all').emit('user joined', username)
            })
        })

        socket.on('typing', function (username) {
            socket.to().emit('user typing');
        })

        socket.on('stop typing', function () {
            socket.to('all').emit('user stop typing');
        })

        socket.on('send message', function(username, message) {
            socket.to('all').broadcast.emit('receive message', username, message);
        })

        /*
        socket.on('create room', function (data) {
            socket.join(nameRoom);

            socket.broadcast.emit('new room', {
                nameRoom: nameRoom,
                creator: creator
            })
        })*/

    })

}