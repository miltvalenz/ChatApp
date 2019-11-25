import React, { useState, useEffect } from 'react';
import querystring from 'query-string';
import io from 'socket.io-client';

import InfoBar from '../InfoBar/InfoBar';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
    const ENDPOINT = 'localhost:5000';

    const [
        name,
        setName 
    ] = useState('');

    const [
        room,
        setRoom
    ] = useState('');

    const [
        message,
        setMessage
    ] = useState('');

    const [
        messages,
        setMessages
    ] = useState([]);
    
    useEffect(() => {
        const { name, room } = querystring.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room}, () => {
            
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
        
    }, [ENDPOINT, location.search]);

    // Manage all messages on the room
    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });
    }, [messages]);

    // Function to send messages
    const sendMessage = (event) => {
        event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    };

    console.log(message, messages);

    return(
        <div className="outerContainer">
            <InfoBar room={room}/>
            {/*<div className="container">
                <input value={message} 
                    onChange={ event => setMessage(event.target.value)}
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                />
            </div>*/}
        </div>
    )
}

export default Chat;