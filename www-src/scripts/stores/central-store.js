var Reflux = require('reflux');
var merge = require('merge');
var actions = require('../actions');

module.exports = function(state) {

    // Creates a DataStore
    var centralStore = Reflux.createStore({

        // Initial setup
        init: function() {
            this.appState = state;
            // this.listenTo(actions.user.signup.completed, this.handleSignup);
        },

        handleLogin: function(data) {
            this.aggregateData('user')({userGuid: data.userGuid});
        },

        // This is used by the server to clear all listeners
        destroy: function() {
            this.stopListeningToAll();
        },

        aggregateData: function(name) {
            var self = this;
            return function(data) {
                self.update(name, data);
            };
        },

        sync: function() {
            this.trigger(JSON.parse(JSON.stringify(this.appState)));
        },

        update: function(name, data) {
            this.appState[name] = data;
            var data = JSON.parse(JSON.stringify(this.appState)) 
            this.trigger(data);
        }

    });

    return centralStore;

};
