'use strict';

var router = require('koa-router')();

var CentralStore = require('../../www-src/scripts/stores/central-store');

var list = [];

router.get('/*', function *(next) {

    var appState = { };

    this.res.locals = {
        appState: appState
    }

    var centralStore = CentralStore( appState );
    var markup = '';

    yield this.render('app', { appState: appState, html: markup } );

    yield next;

});

list.push(router);

module.exports = list;
