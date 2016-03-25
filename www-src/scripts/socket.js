
var socket;

if (typeof io === 'function') {

    var old = false;
    if (process.title === 'browser') {
        var userAgent = window.navigator.userAgent;
        var old = (userAgent.indexOf('Android 4') > -1 && userAgent.indexOf('Safari') > -1);
    }

    if (!old) {
        socket = io(location.protocol + '//' + location.host);
    } else {
        socket = io(location.protocol + '//' + location.host, {
            transports: ['xhr-polling']
        });
    }

} else {
    socket = {
        on: function() {},
        send: function() {}
    };
}

module.exports = socket;
