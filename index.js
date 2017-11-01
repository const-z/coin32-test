"use strict";

const express = require("express");
const UniService = require("./unique-service");
const bodyParser = require("body-parser");
const config = require("./config");

const app = express();

app.use(bodyParser.json());

app.get("/", async (req, res) => {
	res.send("Hello World!");
});

app.post("/", async (req, res) => {
	let result;
	let tm = Date.now();
	try {
		result = await UniService.request(req.body);
		res.json({
			success: true,
			result
		});
	} catch (err) {
		console.error(err);
		res.json({
			success: false,
			error: err.message
		});		
	}	
	console.log(`request done ${Date.now() - tm}`);
});

app.listen(config.server.port, () => {
	console.log(`PORT : ${config.server.port}`);
});