#mongoFactory

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


