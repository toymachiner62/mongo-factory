/**
 * Creates and manages the Mongo connection pool
 *
 * @type {exports}
 */
var Q = require('q');
var MongoClient = require('mongodb').MongoClient;
var _ = require('underscore');

var connections = [];
var dbPromise = null;

module.exports = function() {

  return {

    /**
     * Gets a connection to Mongo from the pool. If the pool has not been instantiated it,
     *    instantiates it and returns a connection. Else it just returns a connection from the pool
     *
     * @returns {*}   - A promise object that will resolve to a mongo db object
     */
    getConnection: function getConnection(connectionString) {

      var def = Q.defer();
			
			// If connectionString is null or undefined, return an error
			if(_.isEmpty(connectionString)) {
				def.reject('getConnection must contain a first parameter');
				return dbPromise = def.promise;
			}

      // Check if connections contains an object with connectionString equal to the connectionString passed in and set the var to it
      var pool = _.findWhere(connections, {connectionString: connectionString});

			//console.log(connections);
			
			
			console.log('pool = '+pool);
      // If no conneciton pool has been instantiated, instantiate it, else return a connection from the pool
      if(_.isUndefined(pool)) {

				console.log('here');

				console.log('connectString = '+connectionString);

        // Initialize connection once
        MongoClient.connect(connectionString, function(err, database) {
					
					console.log('in connect');
					
          if (err) {
            def.reject(err);
          }

          // Add the connection to the array
          connections.push({connectionString: connectionString, db: database});
					console.log('after');
					//console.log(connections);
          def.resolve(database);
        });

      } else {  // Else we have not instantiated the pool yet and we need to
        def.resolve(pool.db);
      }

      return dbPromise = def.promise;
    }
  };
}();
