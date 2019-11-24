const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

const PORT = process.env.PORT || 5000;
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

/**
 * Sockect.io to Connect and Disconnect Chat
 */
io.on('connection', (socket) => {
    console.log('New Connection!!!');

    socket.on('join', ({ name, room }, callback) => {
        const { err, user } = addUser({ id: socket.id, name, room});

        if(error) {
            return callback(error);
        }

        socket.join(user.room);
    });

    socket.on('disconnect', () => {
        console.log('Left Connection!!!');
    });
});


/**
 * Run routes
 */
app.use(router);

/**
 * Initialize server
 */
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
}); 
