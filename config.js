"use strict";

let config = {
	server: {
		port: 3000
	},
	database: {
		url: "mongodb://localhost:27017/coin32-test",
		defaultTtl: 10,
		debug: false,
		datasCollectionName : "objects",
		requestsCollectionName: "requests"
	}
};

try {
	config = require("./config-custom");
	console.log("use custom config");
} catch (err) {
	console.log("use default config");
}

module.exports = config;