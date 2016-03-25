"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import { Router} from 'react-router';
import { browserHistory } from 'react-router';

let Routes = require('./routes');

let CentralStore = require("./stores/central-store");

let getData = function(name) {
    var data = {};
    try {
        data = JSON.parse(document.querySelector(name).innerHTML);
    } catch (err) {
        //console.log("error", name, err);
    }
    return data;
};

let appState = getData('[data-app-state]');

let centralStore = CentralStore(appState);

let root = document.querySelector('[data-root]');

function createElement(Component, props) {
    props.centralStore = centralStore;
    return <Component {...props}/>
}

ReactDOM.render(<Router history={browserHistory} centralStore={centralStore} routes={Routes} createElement={createElement} />, root);
