/**
 * Creates and manages the Mongo connection pool
 *
 * @type {exports}
 */
var Promise = require('es6-promise').Promise;
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var _ = require('underscore');

// Store all instantiated connections.
var connections = [];

module.exports = function() {

  return {

    /**
     * Gets a Mongo connection from the pool.
     *
     * If the connection pool has not been instantiated yet, it is first
     * instantiated and a connection is returned.
     *
     * @returns {Promise|Db} - A promise object that resolves to a Mongo db object.
     */
    getConnection: function getConnection(connectionString) {
      return new Promise(function(resolve, reject) {
        // If connectionString is null or undefined, return an error.
        if (_.isEmpty(connectionString)) {
          return reject('getConnection must be called with a mongo connection string');
        }

        // Check if a connection already exists for the provided connectionString.
        var pool = _.findWhere(connections, { connectionString: connectionString });

        // If a connection pool was found, resolve the promise with it.
        if (pool) {
          return resolve(pool.db);
        }

        // If the connection pool has not been instantiated,
        // instantiate it and return the connection.
        MongoClient.connect(connectionString, function(err, database) {
          if (err) {
            return reject(err);
          }

          // Store the connection in the connections array.
          connections.push({
            connectionString: connectionString,
            db: database
          });

          return resolve(database);
        });
      });
    },

    /**
     * Exposes Mongo ObjectID function.
     *
     * @returns {Function} - Mongo ObjectID function
     */
    ObjectID: function() {
      return mongo.ObjectID();
    }
  };
}();
