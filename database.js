"use strict";

const mongoose = require("mongoose");
const config = require("./config");

const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
mongoose.connect(config.database.url, { useMongoClient: true });
mongoose.set("debug", config.database.debug);

// REQUEST SHEMA
const RequestSchema = new Schema({
	hash: { type: String },
	result: { type: Boolean },
	beginLive: { type: Date }
}, { strict: false, versionKey: false });

RequestSchema.index({ hash: 1 });
RequestSchema.index({ beginLive: 1 }, { expireAfterSeconds: config.database.defaultTtl });

// DATA SHEMA
const DataSchema = new Schema({
	
}, { strict: false, versionKey: false });

const RequestModel = mongoose.model(config.database.requestsCollectionName, RequestSchema, config.database.requestsCollectionName);
const DataModel = mongoose.model(config.database.datasCollectionName, DataSchema, config.database.datasCollectionName);

module.exports = {
	RequestModel,
	DataModel
};