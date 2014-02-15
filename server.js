'use strict';

require('express-namespace');
var express = require('express');
var http = require('http');

module.exports = function(args){
  var app = express();
  var server = http.createServer(app);

  server.listen(args.port, function(){
    if(args.port === 0 || !args.silent){
      console.log('Listening on port '+server.address().port);
    }
  });

  app.namespace('/api/clusters', function(){
    require('./lib/controllers/api/clusters')(app, args);
  });
};