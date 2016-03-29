'use strict';

var logger = require('../logger');
var runner = require('../runner');

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

        socket.on('code.run', (data, callback) => {

            runner.run(data.code)
                .then(() => {
                    callback({});
                })
                .catch((err) => {
                    callback({error: err});
                });

        });

    });

};
