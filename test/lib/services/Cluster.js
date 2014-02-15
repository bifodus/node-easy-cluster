'use strict';

describe('Cluster', function() {
  var assert = require('assert');
  var sinon = require('sinon');
  var prequire = require('proxyquire');
  var fsHelpers = {
    fileExists:null
  };
  var modulePath = '../../../lib/services/Cluster';
  var Cluster;

  beforeEach(function() {
    delete require.cache[modulePath];
    Cluster = prequire(modulePath, {
      '../util/fsHelpers':fsHelpers
    });
    fsHelpers.fileExists = sinon.stub().returns(true);
    fsHelpers.fileExists.reset();
  });

  describe('#create', function() {
    it('creates new Clusters', function(done) {
      Cluster.create({workerPath:'asdfasdf'}, function(err, id){
        assert(!err);
        id.should.equal(0);
        sinon.assert.calledWith(fsHelpers.fileExists, 'asdfasdf');
        done();
      });
    });

    it('expects an object', function(done){
      Cluster.create(null, function(err, id){
        err.should.be.an.instanceOf(Error);
        err.message.should.equal('Cannot read property \'workerPath\' of null');
        done();
      });
    });

    it('expects a workerPath argument', function(done) {
      Cluster.create({}, function(err, id){
        err.should.be.an.instanceOf(Error);
        err.message.should.equal('no workerPath given');
        done();
      });
    });

    it('expects a workerPath that exists', function(done) {
      fsHelpers.fileExists.returns(false);
      Cluster.create({workerPath:'asdf'}, function(err, id){
        err.should.be.an.instanceOf(Error);
        err.message.should.equal('workerPath: asdf is not an existing file.');
        done();
      });
    });

    it('increments the index when called more than once', function(done){
      Cluster.create({workerPath:'asdf'}, function(err, id){
        id.should.equal(0);
        Cluster.create({workerPath:'asdf'}, function(err, id){
          id.should.equal(1);
          Cluster.create({workerPath:'asdf'}, function(err, id){
            id.should.equal(2);
            done();
          });
        });
      });
    });

    it('uses old indexes when clusters are deleted', function(done){
      Cluster.create({workerPath:'asdf'}, function(err, id){
        id.should.equal(0);
        Cluster.create({workerPath:'asdf'}, function(err, id){
          id.should.equal(1);
          Cluster.create({workerPath:'asdf'}, function(err, id){
            id.should.equal(2);
            Cluster.delete(1, function(err, id){
              Cluster.create({workerPath:'asdf'}, function(err, id){
                id.should.equal(1);
                done();
              });
            });
          });
        });
      });
    });
  });

  describe('#delete', function() {

    beforeEach(function() {
      sinon.stub(Cluster.prototype, 'shutdown');
    });

    afterEach(function() {
      Cluster.prototype.shutdown.restore();
    });

    it('succeeds when the cluster does not exist', function(done) {
      Cluster.delete(1, function(err){
        assert(!err);
        done();
      });
    });
  });
});