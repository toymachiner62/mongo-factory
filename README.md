#mongo-factory
[![Travis CI](https://travis-ci.org/toymachiner62/mongo-factory.svg?branch=master)](https://travis-ci.org/toymachiner62/mongo-factory.svg?branch=master)
[![Code Climate](https://codeclimate.com/github/toymachiner62/mongo-factory/badges/gpa.svg)](https://codeclimate.com/github/toymachiner62/mongo-factory)
[![Test Coverage](https://codeclimate.com/github/toymachiner62/mongo-factory/badges/coverage.svg)](https://codeclimate.com/github/toymachiner62/mongo-factory)

> The purpose of this module is to manage mongo connection pools without creating a new connection pool in every file.
>
> You can require this module in as many files as you want and every time you call `mongoFactory.getConnection`, it returns
> a connection if one exists for the connection string passed in, or it instantiates the connection pool and
> then returns a connection.

##Usage

```js
var mongoFactory = require('mongoFactory');

mongoFactory.getConnection('mongodb://localhost:27017').then(function(db) {
	// user "db" as you normally would
	db.collection.find()....
});
```

##Contributing

1. Clone project and run `npm install`
2. Add feature(s) 
3. Add tests for it
4. Submit pull request


