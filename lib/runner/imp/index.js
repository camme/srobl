'use strict';

const five = require("johnny-five");
const Imp = require("imp-io");
const config = require('../../../config');

let timeToTurnRight = 1400;
let timeToTurnLeft = 1400;

exports.init = function() {

    let promise = new Promise((resolve, reject) => {

        const board = new five.Board({
            io: new Imp({ agent: config.IMP_AGENT }),
            repl: false
        });

        board.on("disconnect", function(err) {
            console.log("disc");
            reject(err);
        });

        board.on("error", function(err) {
            console.log(err);
            reject(err);
        });

        board.on("ready", function() {

            var left = new five.Servo({ pin: 9, type: "continuous" }).stop();
            var right = new five.Servo({ pin: 8, type: "continuous" }).stop();

            var commands = {

                stop: () => {
                    left.stop();
                    right.stop();
                    // console.log('stop');
                    return Promise.resolve();
                },

                forward: () => {
                    return () => {
                        let promise = new Promise((resolve) => {
                            console.log('forward');
                            left.cw(1);
                            right.ccw(1);
                            setTimeout(() => {
                                commands.stop();
                                resolve();
                            }, 1000);
                        });
                        return promise;
                    };
                },

                back: () => {
                    return () => {
                        let promise = new Promise((resolve) => {
                            console.log('back');
                            left.cw(-1);
                            right.ccw(-1);
                            setTimeout(() => {
                                commands.stop();
                                resolve();
                            }, 1000);
                        });
                        return promise;
                    };
                },

                right: () => {
                    return () => {
                        let promise = new Promise((resolve) => {
                            console.log('right');
                            left.ccw(1);
                            right.ccw(1);
                            setTimeout(() => {
                                commands.stop();
                                resolve();
                            }, timeToTurnRight);
                        });
                        return promise;
                    };
                },

                left: () => {
                    return () => {
                        let promise = new Promise((resolve) => {
                            console.log('left');
                            left.cw(1);
                            right.cw(1);
                            setTimeout(() => {
                                commands.stop();
                                resolve();
                            }, timeToTurnLeft);
                        });
                        return promise;
                    };
                },

                wait: (ms) => {
                    return () => {
                        let promise = new Promise((resolve) => {
                            console.log('wait');
                            setTimeout(() => {
                                resolve();
                            }, ms);
                        });
                        return promise;
                    }
                }


            };

            resolve(commands);

        });

    });

    return promise;

};





