const express = require("express");
const Person = require("../../person_model");
require("dotenv").config();

//Status code are most definitively not correct
export default function handler(req, res) {
	const { personCPF } = req.query;
	const id = { cpf: personCPF[0] };
	console.log(id);
	if (req.method === "GET") {
		//Find info by ID
		try {
			Person.findOne(id, (err, data) => {
				if (err)
					res
						.status(500)
						.json({ error: "failed to get data", errorMessage: err });
				return res.status(200).json(data); //If successfull
			});
		} catch (err) {
			return res
				.status(400)
				.json({ error: "Input invalid", errorMessage: err });
		}
	} else if (req.method === "PUT") {
		try {
			Person.findOneAndUpdate(id, req.body, { new: true }, (err, data) => {
				if (err)
					return res.status(504).json({
						error: "failed to update data",
						errorMessage: err.message,
					});
				return res.status(200).json(data);
			});
		} catch (err) {
			return res
				.status(400)
				.json({ error: "Input invalid", errorMesage: err.message });
		}
	} else if (req.method === "DELETE") {
		try {
			Person.findOneAndRemove(id, (err, data) => {
				if (err)
					return res.status(502).json({ error: "failed to delete data" });
				return res.status(201).json(data);
			});
		} catch (err) {
			return res.status(400).json({ error: "Input invalid", errorMesage: err });
		}
	} else {
		console.log("hi");
		return res
			.status(405)
			.json({ error: "Method not allowed", method: req.method });
	}
}
