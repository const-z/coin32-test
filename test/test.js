"use strict";

const mocha = require("mocha");
const assert = require("assert");
const describe = mocha.describe;
const it = mocha.it;

describe("Test requests", async () => {

	before(() => {
		const gendata = require("./generate-data");
		return gendata(2000);
	});

	it("Must Not exists", async () => {
		const UniService = require("../unique-service");
		let exists = await UniService.request({
			"key1": "value-1",
			"key2": "value-1",
			"key3": "value-1",
			"key4": "value-1",
			"ttl": 30,
			"key5": {
				"2": "value-1",
				"1": "value-12"
			}
		});
		assert.equal(exists, false);
		return;
	});

	it("Must Exists", async () => {
		const UniService = require("../unique-service");
		let exists = await UniService.request({
			"key1": "value-1",
			"key2": "value-1"
		});
		assert.equal(exists, true);
		return;
	});

});
