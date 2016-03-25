'use strict';

require('./server');

/*

let five = require('johnny-five');
let Particle = require('particle-io');
let commands = require('./commands');
let token = '134f6550a9129c2c8ada3a4b5b44dd7b8b7bcee9';
let deviceId = '55ff71066678505544261367';

let board = five.Board({
    io: new Particle({
        token: token,
        deviceId: deviceId
    })
});

board.on('ready', () => {

    console.log('connected');

    let servo1 = five.Servo.Continuous(10);
    let servo2 = five.Servo.Continuous(11);

    let c = commands.init(servo1, servo2);

    console.log(c);

    // c.forward();

    Promise.resolve()
        .then(c.forward)
        .then(c.right)
        .then(c.left)
        // .then(c.stop);




        });

*/
