/**
 * Array for save user's data
 */
const users = [];

/**
 * Function to create user's object.
 * First verify if user exists on Users Array.
 * If user exists, return error message.
 * Else new user is create, push on Users Array.
 * @param {Object} id, name, room 
 * @returns {Object} user
 */
const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existUser = users.find((user) => user.room === room && user.name === name);

    if(existUser) {
        return { error: 'Username is Taken'};
    }

    const user = { id, name, room };
    users.push(user);

    return { user };
};

/**
 * Function to remove user from Users Array.
 * @param {number} id 
 */
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index != -1) {
        return users.splice(index, 1)[0];
    }
};

/**
 * Function to Get one user from Users Array
 * @param {number} id 
 * @returns {object} user
 */
const getUser = (id) => users.find((user) => user.id === id); 

/**
 * Function to get users in room.
 * @param {string} room 
 * @returns {Array} users
 */
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };