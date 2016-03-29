"use strict";

import React from 'react';
import { Link, State, Router, Route } from 'react-router';

require('../../socket');

let Start = require('../start');

// var Header = require('./header/header');
// var Footer = require('./footer');
// var UserDashboard = require('./user-dashboard');

var App = React.createClass({

    mixins: [ State ],

    updateAppState: function(appState) {
        this.setState({appState: appState});
    },

    componentWillMount: function() {
        this.unsubscribe = this.props.centralStore.listen(this.updateAppState);
        this.props.centralStore.sync();
    },

    componentWillUnmount: function() {
        this.unsubscribe();
    },

    render: function () {

        var Content = Start;

        // We need to pass the appstate to all our children
        var children = this.props.children ? React.cloneElement(this.props.children, this.state) : (<Content {...this.state} />);
        
        return (
            <div className="app">
                <main className="app--main">{ children }</main>
            </div>
        );
    }

});

module.exports = App;
