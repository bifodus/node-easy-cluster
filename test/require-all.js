'use strict';
/**
 * This simply requires all modules so istanbul can complain more :)
 */

var glob = require('glob');

glob.sync('../lib/**/*.js', {cwd:__dirname}).forEach(function(module){
  require(module);
});

require('../server.js');