'use strict';

describe('server.js', function() {
  var sinon = require('sinon');
  var prequire = require('proxyquire');
  var express = sinon.stub();
  var app = {
    namespace:sinon.stub().callsArg(1)
  };
  var server = {
    address:sinon.stub(),
    listen:sinon.stub()
  };
  var http = {
    createServer : sinon.stub().returns(server)
  };
  var clustersController = sinon.stub();
  var serverModule = prequire('../server.js', {
    'express':express,
    'http':http,
    './lib/controllers/api/clusters':clustersController
  });
  var address;
  var args;

  beforeEach(function() {
    address = {
      port:776
    };
    args = {
      'port':0
    };
    app.namespace.reset();
    http.createServer.reset();
    server.listen.reset();
    server.address.reset();
    server.address.returns(address);
    express.reset();
    express.returns(app);
    sinon.stub(console, 'log');
  });

  afterEach(function() {
    console.log.restore();
  });

  describe('by default', function(){
    beforeEach(function(){
      serverModule(args);
    });

    it('passes an app and the args to controllers', function() {
      sinon.assert.calledWith(clustersController, app, sinon.match(args));
    });

    it('sets namespaces', function(){
      sinon.assert.calledWith(app.namespace, '/api/clusters', sinon.match.func);
    });

    it('creates a server with the app', function(){
      sinon.assert.calledWith(http.createServer, app);
    });

    it('listens on the port given in args', function(){
      server.listen.args[0][1]();
      sinon.assert.calledWith(server.listen, 0);
    });

    it('outputs the port listening on when port is 0', function() {
      server.listen.args[0][1]();
      sinon.assert.calledWith(console.log, 'Listening on port 776');
    });
  });

  describe('when --port is > 0 and --silent', function() {
    it('is silent about the port', function() {
      args.port = 5;
      args.silent = true;
      serverModule(args);
      server.listen.args[0][1]();
      sinon.assert.notCalled(console.log);
    });
  });
});