'use strict';

describe('enforceKey middleware', function() {
  var sinon = require('sinon');
  var module = require('../../../lib/util/middleware/enforceKey');
  var next = sinon.stub();
  var req = {
    body:null,
    query:null
  };
  var res = {
    send:sinon.stub()
  };

  beforeEach(function() {
    req.body = {};
    req.query = {};
    next.reset();
    res.send.reset();
  });

  it('accepts a key and returns middleware', function() {
    var middleware = module('foot');
    middleware.length.should.equal(3);
  });

  describe('on requests', function() {
    var middleware;

    beforeEach(function() {
      middleware = module('wack');
    });

    it('calls res.send 403 if key is absent in body and query', function() {
      middleware(req, res, next);
      sinon.assert.notCalled(next);
      sinon.assert.calledWith(res.send, 403);
    });

    it('calls res.send 403 if key does not match body key', function() {
      req.body.key = 'foo';
      middleware(req, res, next);
      sinon.assert.notCalled(next);
      sinon.assert.calledWith(res.send, 403);
    });

    it('calls res.send 403 if key does not match query key', function() {
      req.query.key = 'foo';
      middleware(req, res, next);
      sinon.assert.notCalled(next);
      sinon.assert.calledWith(res.send, 403);
    });

    it('calls next if key is in body and it matches', function() {
      req.body.key = 'wack';
      middleware(req, res, next);
      sinon.assert.called(next);
      sinon.assert.notCalled(res.send);
    });

    it('calls next if key is in query and it matches', function() {
      req.query.key = 'wack';
      middleware(req, res, next);
      sinon.assert.called(next);
      sinon.assert.notCalled(res.send);
    });
  });
});