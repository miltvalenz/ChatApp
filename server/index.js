const express = require('express');
const socketio = require('socket.io');
const http = require('http');

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
