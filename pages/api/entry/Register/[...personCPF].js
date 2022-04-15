import person_model from "../../person_model";

const express = require("express");
const app = express();
const Person = require("../../person_model");
require("dotenv").config();

export default function handler(req, res) {
	const { personCPF } = req.query;
	const id = { cpf: personCPF[0] };
	console.log(req.method);
	if (req.method === "GET") {
		try {
			Person.findOne(id, (err, data) => {
				if (err)
					res
						.status(500)
						.json({ error: "failed to get data", errorMessage: err });
				return res.status(200).json(data); //If successfull
			});
		} catch (err) {
			res.status(400).json({ error: "Input invalid", errorMessage: err });
		}
	}
	if (req.method === "PUT") {
		try {
			findOneAndUpdate(id, req.body, { new: true }, (err, data) => {
				if (err)
					res.status(504).json({
						error: "failed to update data",
						errorMessage: err.message,
					});
				res.status(200).json(data);
			});
		} catch (err) {
			return res
				.status(400)
				.json({ error: "Input invalid", errorMesage: err.message });
		}
	}
	if (req.method === "DELETE") {
		try {
			Person.findOneAndRemove(id, (err, data) => {
				if (err)
					if (err) res.status(502).json({ error: "failed to delete data" });
				res.status(201).json(data);
			});
		} catch (err) {
			res.status(400).json({ error: "Input invalid", errorMesage: err });
		}
	} else {
		return res
			.status(405)
			.json({ error: "Method not allowed", method: req.method });
	}
}
