# UNIOBJECT

![Build Status](https://travis-ci.org/const-z/coin32-test.svg?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/6534669231007493097b/maintainability)](https://codeclimate.com/github/const-z/coin32-test/maintainability)

REQUIREMENTS
------------

* NodeJS 8.0.0 and later
* MongoDB 3.2 and later

INSTALL
-------

* git clone [this repo url]
* cd [this repo]
* npm i

CONFIG
------

Default config (config.js):
```
server: {
	port: 3000 // listen port
},
database: {
	url: "mongodb://localhost:27017/coin32-test", // mongodb connection
	defaultTtl: 10, // sec, when ttl indexes will be removed
	debug: false, // logs mongodb queries
	datasCollectionName : "objects", // collection for search objects
	requestsCollectionName: "requests" // collection for save requests
}
```	

Create a file "config-custom.js" for override default "config.js". Ex:
```
module.exports = {
	server: {
		port: 4000
	},
	database: {
		url: "mongodb://localhost:27018/mydatabase",
		defaultTtl: 3600,
		debug: false,
		datasCollectionName: "data",
		requestsCollectionName: "req"
	}
};
```


TEST
----

npm test

RUN
---

```
node index.js
```
or 
```
node .
```

With PM2 in fork mode
```
pm2 start index.js 
```

USE
---

Request:
```
curl -X POST \
  http://localhost:3000/ \
  -H 'content-type: application/json' \
  -d '{
	"key1": "value-1",
	"key2": "value-1",
	"key3": "value-1",
	"key4": "value-1",
	"ttl": 30,
	"key5": {
		"2": "value-1",
		"1": "value-12"
	}
}'
```
Response:
```
{
    "success": true,
    "result": false
}
```