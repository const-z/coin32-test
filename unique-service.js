"use strict";

const { EventEmitter } = require("events");
const objectHash = require("object-hash");
const { RequestModel, DataModel } = require("./database");
const config = require("./config");

const calcBeginTime = (requestTtl) => {
	let defaultTtl = config.database.defaultTtl * 1000;
	let ttl = requestTtl * 1000 || defaultTtl;
	const beginLive = new Date((Date.now() - defaultTtl) + ttl);

	return beginLive;
};

const paramRequests = Symbol();
const funcExists = Symbol();
const funcProcess = Symbol();

class UniqueService extends EventEmitter {

	constructor() {
		super();
		this[paramRequests] = {};
	}

	async [funcExists](hash, params) {
		const find = Object.assign(params);
		const ttl = find.ttl || 0;
		delete find.ttl;
		console.log(`[${hash}] find by params ${JSON.stringify(find)}`);
		// delay for debug		
		await new Promise(resolve => { setTimeout(resolve, 5000); });
		const result = await DataModel.find(find).count();
		const exists = !!result;
		const beginLive = calcBeginTime(ttl);
		await RequestModel.update({ hash }, { timestamp: new Date(), request: params, response: exists, beginLive });

		return exists;
	}

	async [funcProcess](hash, params) {
		let request = await RequestModel.update({ hash }, { hash }, { upsert: true });
		let exists;
		if (!request.upserted) {
			console.log(`[${hash}] exists in cache`);
			let result = await RequestModel.findOne({ hash }).lean();
			exists = result.response;
		}
		if (exists === undefined && !this[paramRequests][hash]) {
			try {
				this[paramRequests][hash] = true;
				exists = await this[funcExists](hash, params);
			} finally {
				delete this[paramRequests][hash];
			}
		}
		if (exists !== undefined) {
			this.emit(hash, exists);
		} else {
			console.log(`[${hash}] wait for result`);
		}

		return;
	}

	async request(params) {
		let hash = objectHash(params);
		this[funcProcess](hash, params);
		
		return new Promise((resolve) => {
			this.once(hash, (exists) => {
				resolve(exists);
			});
		});
	}

}

module.exports = new UniqueService();
