'use strict';

let timeToTurnRight = 1300;
let timeToTurnLeft = 1450;

exports.init = function (thing1, thing2) {

    let commands = {

        stop: () => {
            thing1.stop();
            thing2.stop();
            // console.log('stop');
            return Promise.resolve();
        },

        forward: () => {
            let promise = new Promise((resolve) => {
                console.log('forward');
                thing1.cw(1);
                thing2.ccw(1);
                setTimeout(() => {
                    commands.stop();
                    resolve();
                }, 1000);
            });
            return promise;
        },


        right: () => {
            let promise = new Promise((resolve) => {
                console.log('right');
                thing1.ccw(1);
                thing2.ccw(1);
                setTimeout(() => {
                    commands.stop();
                    resolve();
                }, timeToTurnRight);
            });
            return promise;
        },

        left: () => {
            let promise = new Promise((resolve) => {
                console.log('left');
                thing1.cw(1);
                thing2.cw(1);
                setTimeout(() => {
                    commands.stop();
                    resolve();
                }, timeToTurnLeft);
            });
            return promise;
        }



    };

    return commands;

}
