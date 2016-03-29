var Reflux = require('reflux');
var socket = require('../socket');

var code = Reflux.createActions({
    run: { children: ['completed','failed'] }
});

code.run.listen( function(code) {
    socket.emit('code.run', {code}, (result) => {
        if (result.error) {
            return this.failed(result);
        }
        this.completed(result);
    });
});


exports.code = code;
