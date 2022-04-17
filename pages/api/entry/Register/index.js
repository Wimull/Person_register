//https://nextjs.org/docs/api-routes/introduction
//TODO Make Dynamic API route according to REST  https://nextjs.org/docs/api-routes/dynamic-api-routes https://docs.bmc.com/docs/ars2002/examples-of-using-the-rest-api-to-get-update-and-delete-an-entry-from-a-form-909638131.html
const express = require("express");
const app = express();
const Person = require("../../person_model");

export default function handler(req, res) {
	const { personCPF } = req.query;

	console.log(req.method);
	if (req.method === "GET") {
		console.log(req.query);
		Person.find(req.query, (err, data) => {
			if (err)
				return res
					.status(500)
					.json({ error: "Coundn't get data", errorMessage: err });
			return res.status(200).json(data);
		});
	}
	if (req.method === "POST") {
		console.log(req.body);
		try {
			let data = new Person(req.body);
			Person.init()
				.then(() => {
					data.save((err, data) => {
						if (!err) return res.status(200).json(data);
						if (err.message.indexOf("duplicate key error") !== -1) {
							return res.status(406).json({
								error: "Duplicate key error",
								errorMesage: err.message,
							});
						}
						if (err.message.indexOf("Person validation failed") !== -1) {
							return res.status(406).json({
								error: "Missing required paramethers",
								errorMesage: err.message,
							});
						}
						if (err) {
							return res.status(503).json({
								error: "failed to save data",
								errorMessage: err.message,
							});
						}

						//If successfull
					});
				})
				.catch((error) => {
					if (error.message.indexOf("duplicate key error") !== -1)
						return res.status(406).json({
							error: "Duplicate key error",
							errorMesage: error.message,
						});
				});
		} catch (err) {
			return res
				.status(400)
				.json({ error: "Input invalid", errorMessage: err.message });
		}
	}
}
