var chai = require('chai');
var expect = chai.expect;
//var spies = require('chai-spies');

describe('mongoFactory', function() {
	
	it('can be required without blowing up', function() {
		var mongoFactory = require('../');
		expect(mongoFactory).to.exist;
	});
	
	describe('getConnection()', function() {
		
		var mongoFactory;
		
		beforeEach(function() {
			mongoFactory = require('../');
		})
		
		describe('with no arguments passed in', function() {
			it('should fulfill the promise', function(done) {
				//var mongoFactory = require('../');
				var con = mongoFactory.getConnection();
				expect(con).to.be.fulfilled;
				done();
			});
			
			it('should return a rejected promise', function(done) {
				//var mongoFactory = require('../');
				var con = mongoFactory.getConnection();
				expect(con).to.be.rejected;
				done();
			});
 		});
		
		describe('with a null parameter', function() {
			it('should return a rejected promise', function(done) {
				//var mongoFactory = require('../');
				var con = mongoFactory.getConnection(null);
				expect(con).to.be.rejected;
				done();
			});
		});
		
		describe('with a valid mongo string parameter', function() {
			describe('needing to create the pool the first time', function() {
				it('should return a fulfilled promise', function(done) {
					var con = mongoFactory.getConnection('mongodb://localhost:27017').then(function(db) {
						expect(con).to.be.fulfilled;
						expect(con).to.not.be.rejected;
						done();
					});
				});
			});
			
			describe('after a pool is already instantiated', function() {
				it('should return a fulfilled promise', function(done) {
					var con1 = mongoFactory.getConnection('mongodb://localhost:27017').then(function() {
						var con = mongoFactory.getConnection('mongodb://localhost:27017').then(function() {
							expect(con).to.be.fulfilled;
							expect(con).to.not.be.rejected;
							done();
						});
					});
				});
			});
		});
	});
});