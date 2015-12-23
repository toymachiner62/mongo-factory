/**
 * Creates and manages the Mongo connection pool
 *
 * @type {exports}
 */
var Promise = require('es6-promise').Promise;
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var _ = require('underscore');

var connections = [];

module.exports = function() {

  return {

    /**
     * Gets a connection to Mongo from the pool. If the pool has not been instantiated it,
     *    instantiates it and returns a connection. Else it just returns a connection from the pool
     *
     * @returns {*}   - A promise object that will resolve to a mongo db object
     */
    getConnection: function getConnection(connectionString) {
      return new Promise(function(resolve, reject) {

        // If connectionString is null or undefined, return an error
        if(_.isEmpty(connectionString)) {
          return reject('getConnection must be called with a mongo connection string');
        }

        // Check if connections contains an object with connectionString equal to the connectionString passed in and set the var to it
        var pool = _.findWhere(connections, {connectionString: connectionString});

        // If no conneciton pool has been instantiated, instantiate it, else return a connection from the pool
        if(_.isUndefined(pool)) {

          // Initialize connection once
          MongoClient.connect(connectionString, function(err, database) {

            if (err) {
              reject(err);
            }

            // Add the connection to the array
            connections.push({connectionString: connectionString, db: database});

            resolve(database);
          });

        } else {  // Else we have not instantiated the pool yet and we need to
          resolve(pool.db);
        }

      });
    },

    /**
     * Exposes mongodb's ObjectID function
     *
     * @returns  - Mongodb's ObjectID function
     */
    ObjectID: function() {
      return mongo.ObjectID();
    }
  };
}();
