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

    /**
     * Create and Join new users to room
     */
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room});

        if(error) {
            return callback(error);
        }

        // Emit message of welcome to new user joined to the room
        socket.emit('message', { user: 'admin', text: `${user.name}, Welcome to the room ${user.room}`});

        // Emit message of all user on the room about the new user joined
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!`});

        socket.join(user.room);

        callback();
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
