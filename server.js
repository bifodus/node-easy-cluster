'use strict';

require('express-namespace');
var express = require('express');
var http = require('http');
var enforceKey = require('./lib/util/middleware/enforceKey');

module.exports = function(args){
  var app = express();
  var server = http.createServer(app);

  if(args.key){
    app.use(enforceKey(args.key));
  }

  server.listen(args.port, function(){
    if(args.port === 0 || !args.silent){
      console.log('Listening on port '+server.address().port);
    }
  });

  app.namespace('/api/clusters', function(){
    require('./lib/controllers/api/clusters')(app, args);
  });
};