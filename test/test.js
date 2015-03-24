var chai = require('chai');
var expect = chai.expect;
var mongo = require('mongodb');

describe('mongoFactory', function() {

	var mongoFactory;
		
	beforeEach(function() {
		mongoFactory = require('../');
	});
	
	it('can be required without blowing up', function() {
		var mongoFactory = require('../');
		expect(mongoFactory).to.exist;
	});
	
	describe('getConnection()', function() {
		
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

	describe.only('ObjectID', function() {
		it('should return mongo\'s ObjectID method', function() {
			var oid = mongoFactory.ObjectID;
			expect(oid).to.be.a.function;
		});

		it('should allow you to create a new ObjectID', function() {
			var oid = new mongoFactory.ObjectID;
			expect(oid.toHexString().length).to.equal(24);
		});

		it('should allow you to compare ObjectID\'s', function() {
			var oid1 = new mongoFactory.ObjectID;
			var oid2 = new mongoFactory.ObjectID(oid1.id);
			var oid3 = new mongoFactory.ObjectID;
			expect(oid1.equals(oid2));
			expect(!oid1.equals(oid3));
		});

		it('should allow you to create a new ObjectID with a specific timestamp', function() {
			// Get a timestamp in seconds
			var timestamp = Math.floor(new Date().getTime()/1000);
			// Create a date with the timestamp
			var timestampDate = new Date(timestamp*1000);
			var oid = new mongoFactory.ObjectID(timestamp);
			expect(oid.getTimestamp().toString()).to.equal(timestampDate.toString());
		});

	});
});