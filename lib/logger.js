'use strict';

const winston = require('winston');
const config = require('../config');

winston.level = config.LOG_LEVEL || 'error';

module.exports = winston;
