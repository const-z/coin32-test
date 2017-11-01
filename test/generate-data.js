"use strict";

const randInt = (min, max) => {
	let rand = min + Math.random() * (max + 1 - min);
	rand = Math.floor(rand);
	return rand;
};

module.exports = async (total = 500) => {
	let { DataModel } = require("../database");
	const variants = [
		{
			"key1": "value",
			"key2": "value"
		},
		{
			"key1": "value",
			"key2": "value",
			"key4": "value",
			"key3": "value",
			"key5.2": "value",
			"key5.1": "value"
		}
	];
	const batchSize = 1000;
	let saves = [];
	for (let i = 0; i < total; i++) {
		let v = randInt(0, 1);
		let data = Object.assign({}, variants[v]);
		Object.keys(data).forEach(k => {
			data[k] = `${data[k]}-${i}`;
		});
		saves.push(DataModel(data).save());
		if (saves.length >= batchSize) {
			console.log(`saving ${batchSize} (left ${total - (i + 1)}) documents...`);
			await Promise.all(saves);
			console.log("\t...done");
			saves = [];
		}
	}
	return await Promise.all(saves);
};
