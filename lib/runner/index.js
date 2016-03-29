'use strict';

const fs = require('fs');
const path = require('path');
const PEG = require('pegjs');
const logger = require('../logger');
const robot = require('./imp');

const parserRules = fs.readFileSync(path.join(__dirname, '../../grammar/srobl-peg-grammar.txt'), 'utf8');
const parser = PEG.buildParser(parserRules);


let actions;

robot.init()
    .then(a => {
        actions = a;
        console.log('yes');
    })
    .catch(console.log);

exports.run = function(code) {

    let promise = new Promise((resolve, reject) => {

        let parsedCode = parser.parse(code);

        let queue = [];

        parsedCode.forEach(row => {

            if (row.action === 'åk') {

                for(var i = 0, ii = parseInt(row.steps); i < ii; i++) { 
                    if (row.direction === 'fram') {
                        queue.push(actions.forward());
                    } else if (row.direction === 'bak') {
                        queue.push(actions.back());
                    }
                }


            } else if (row.action === 'snurra') {

                for(var i = 0, ii = parseInt(row.steps); i < ii; i++) { 
                    if (row.direction === 'till höger') {
                        queue.push(actions.right());
                    } else if (row.direction === 'till vänster') {
                        queue.push(actions.left());
                    }
                }

            } else if (row.action === 'vänta') {

                let time = parseInt(row.time);
                if (row.unit === 'sekunder') {
                    time = time * 1000;
                } else if (row.unit === 'minut') {
                    time = time * 1000 * 60;
                }
                queue.push(actions.wait(time));

            } else {

            }

        });

        let p = Promise.resolve();

        for (var i = 0, ii = queue.length; i < ii; i++) {

            p = p.then(() => {
                return queue.shift()();
            })
            .catch((err) => {
                console.log(err);    
                return null;
            });

        }

        p.then(() => {
            resovle();
        });

    });

    return promise;

};
