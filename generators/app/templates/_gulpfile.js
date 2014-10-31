'use strict';

var path = require('path');
var requireDir = require('require-dir');
var env = require('./gulp/env');

env.detect();

requireDir(path.join('./gulp/tasks'), {recurse: true});
