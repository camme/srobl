"use strict";

import React from 'react';
import { State, Router, Route } from 'react-router';

var App = require('./app');

// Define the routes
var routes = (
    <Route component={App} path="/">
    </Route>
);

module.exports = routes;

