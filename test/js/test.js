'use strict';

var chalk = require('chalk');
var shell = require('shelljs');
var Bluebird = require('bluebird');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.should();
chai.use(chaiAsPromised);

chai.should();
shell.config.silent = true;

describe('SQLSN Core', function() {

  beforeEach(function(){
    shell.pushd('test/sql');
  });

  it('should load module from implicit path (defined in sqlsnrc.sql)', function(done) {
    shell.exec('sql /nolog @sqlsn_require.test.sql', function(code, output) {
      code.should.be.equal(0);
      shell.exec('diff ../fixtures/sqlsn_require.test.log sqlsn_require.test.log', function(code, output) {
        code.should.be.equal(0);
        output.should.be.equal('');
        done();
      });
    });
  });

  it('should load module from explicit path', function(done) {
    shell.exec('sql /nolog @sqlsn_require_from_path.test.sql', function(code, output) {
      code.should.be.equal(0);
      shell.exec('diff ../fixtures/sqlsn_require_from_path.test.log sqlsn_require_from_path.test.log', function(code, output) {
        code.should.be.equal(0);
        output.should.be.equal('');
        done();
      });
    });
  });

  it('should exit SQL*Plus and return error when trying to load nonexistent module', function(done) {
    shell.exec('sql /nolog @sqlsn_require_not_existing.test.sql', function(code, output) {
      code.should.be.equal(1);
      shell.exec('grep "SP2-0310: Unable to open file: \\"sqlsn_modules/bar/module.sql\\"" sqlsn_require_not_existing.test.log', function(code, output) {
        code.should.be.equal(0);
        output.should.be.equal('SP2-0310: Unable to open file: "sqlsn_modules/bar/module.sql"\n');
        done();
      });
    });
  });

  it('sqlsn_noop should do nothing', function() {
    shell.exec('sql /nolog @sqlsn_noop.test.sql', function(code, output) {
      code.should.be.equal(1);
      shell.exec('diff ../fixtures/sqlsn_noop.test.log sqlsn_noop.test.log', function(code, output) {
        code.should.be.equal(0);
        output.should.be.equal('');
        done();
      });
    });
  });

  afterEach(function(){
    shell.popd();
  });

});
