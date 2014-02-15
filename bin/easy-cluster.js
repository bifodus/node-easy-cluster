var argv = require('minimist')(process.argv.slice(2), {
  boolean:['--silent']
});
var server = require('../server');

server(argv);