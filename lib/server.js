'use strict';

require('node-jsx').install({extension: '.jsx'});

let path = require('path');
let fs = require('fs');
let http = require('http');

let config = require('../config');
let realtime = require('./realtime');

let koa = require('koa');
let router = require('koa-router')();
let serve = require('koa-static');

let app = koa();

let views = require('koa-views');

app.use(serve(path.join(__dirname, '../www-dev')));

app.use(views(path.join(__dirname, '../views'), {
    html: 'doT',
    // cache: false,
    map: {
        'html': 'dot'
    }
}));

exports.start = function(done) {

    // Load all api endpoints
    var routeList = require('./routes');
    for(var i = 0, ii = routeList.length; i < ii; i++){ 
        var router = routeList[i];
        app.use(router.routes());
        app.use(router.allowedMethods());
    }

    var serve = app.listen(config.PORT, function(err) {
        console.log('Server started');
        if (typeof done == 'function') {
            done(err);
        }    
    });

    var io = require('socket.io')(serve);

    realtime.init(io);

};

exports.stop = function() {
    server.close();
};

exports.start();
