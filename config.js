'use strict';

let path = require('path');
let pkginfo = require('pkginfo')(module, 'version');
let version = module.exports.version;

let hasErrors = false;

function getOrError (name, description) {
    const variable = process.env[name]; // eslint-disable-line no-process-env
    if (!variable) {
        let errString = `Couldn't find env variable with the name ${name}.`;
        if (description) {
            errString += `\n${name} description: ${description}`;
        }
        console.log(errString);
        hasErrors = true;
    }

    return variable;
}

function getEnvVar (name) {
    return process.env[name]; // eslint-disable-line no-process-env
}

exports.PORT = getOrError('PORT', 'Server port');
exports.IMP_AGENT = getEnvVar('IMP_AGENT', 'Imp Agent');

if (hasErrors) {
    process.exit(1);
}
