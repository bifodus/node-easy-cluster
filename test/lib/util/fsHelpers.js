'use strict';

describe('fsHelpers', function(){
  var module = require('../../../lib/util/fsHelpers');

  it('has a fileExists method', function() {
    module.fileExists(__filename).should.be.true;
  });
});