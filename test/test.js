var chai = require('chai');
var expect = chai.expect;
var spies = require('chai-spies');

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
		
		// describe('with an invalid mongo string parameter', function() {
// 			it('should return a rejected promise', function(done) {
// 				//var mongoFactory = require('../');
// 				var spy = chai.spy(mongoFactory);
// 				ee.on('getConnection("mongodb://localhost:27017")', spy);
// 				//var con = mongoFactory.getConnection('mongodb://localhost:27017');
// 				expect(spy).to.be.spy;
// 				expect(spy).to.have.been.called();
// 				//expect(con).to.be.rejected;
// 				done();
// 			});
// 		});
	});
});