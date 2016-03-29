'use strict';

const router = require('koa-router')();
const CentralStore = require('../../www-src/scripts/stores/central-store');
const fs = require('fs');
const path = require('path');

const grammar = fs.readFileSync(path.join(__dirname, '../../grammar/srobl-peg-grammar.txt'), 'utf8');

let list = [];

router.get('/*', function *(next) {

    var appState = { grammar: grammar };

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
