'use strict';

describe('easy-cluster', function() {
  var sinon = require('sinon');
  var prequire = require('proxyquire');
  var server = sinon.stub();
  var module;
  process.argv = [1,2,
    '--key', 'foo',
    '--port', '80',
    '--silent'
  ];

  beforeEach(setModule);

  it('handles options', function() {
    sinon.assert.calledWith(server, sinon.match({
      'key':'foo',
      'port':80,
      'silent':true
    }));
  });

  function setModule(){
    module = prequire('../../bin/easy-cluster', {
      '../server':server
    });
  }
});