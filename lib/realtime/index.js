'use strict';

var logger = require('../logger');

var handleError = function(callback) {
    return function(err) {
        if (err.remote) {
            logger.error("Remote error", err);
        } else {
            logger.error("Local error", err.stack);
        }
        callback({error: true, stack: err.stack});
    }
};

exports.init = function(io) {

    io.on('connection', (socket) => {

        socket.on('user.login', (data, callback) => {

        });

    });

};
