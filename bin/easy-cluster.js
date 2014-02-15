#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2), {
  boolean:['--silent']
});
var server = require('../server');

if(!argv.port)argv.port = 0;

server(argv);