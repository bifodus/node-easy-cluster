'use strict';

describe('clusters', function() {
  var sinon = require('sinon');
  var app = sinon.stub();
  var args;
  var module = require('../../../../lib/controllers/api/clusters');

  beforeEach(function() {
    app.reset();
    args = {};
  });

  it('accepts an app and args', function() {
    module(app, args);
  });
});