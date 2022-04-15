//https://nextjs.org/docs/api-routes/introduction
//TODO Make Dynamic API route according to REST  https://nextjs.org/docs/api-routes/dynamic-api-routes https://docs.bmc.com/docs/ars2002/examples-of-using-the-rest-api-to-get-update-and-delete-an-entry-from-a-form-909638131.html

const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const mongoose = require("mongoose");
const Person = require("./person_model");
require("dotenv").config();
var axios = require("axios");

mongoose.connect(process.env.URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const Aninha = new Person({
	nome: "Ana",
	sobrenome: "Silva",
	nacionalidade: "Brasil",
	cep: "08280-630",
	estado: "São Paulo",
	cidade: "São Paulo",
	logradouro: "Morubixaba 712",
	email: "aninhasilva@tutanota.com",
	telefone: "(11)94744-1928",
});
/*Aninha.save((err, data) => {
	if (err) console.log(err);
	console.log(data);
});*/

export default function handler(req, res) {
	console.log(req.method);
	if (req.method === "GET") {
		Person.find(req.query, (err, data) => {
			if (err) res.status(501).json({ error: "failed to load data" });
			res.status(200).json(data);
		});
	}
	if (req.method === "POST") {
		try {
			data = new Person(req.body);
			data.save((err, data) => {
				if (err) res.status(503).json({ error: "failed to save data" });
				res.status(200).json(data.nome);
			});
		} catch (err) {
			res.status(403).json({ error: "Input invalid", errorMesage: err });
		}
	}
	if (req.method === "PUT") {
		try {
			Person.findOneByIdAndUpdate(
				req.body.id,
				req.body,
				{ new: true },
				(err, data) => {
					if (err) res.status(504).json({ error: "failed to update data" });
					res.status(200).json(data);
				}
			);
		} catch (err) {
			res.status(404).json({ error: "Input invalid", errorMesage: err });
		}
	}
	if (req.method === "DELETE") {
		try {
			Person.findOneAndRemove(req.body, (err, data) => {
				if (err)
					if (err) res.status(502).json({ error: "failed to delete data" });
				res.status(200).json(data);
			});
		} catch (err) {
			res.status(404).json({ error: "Input invalid", errorMesage: err });
		}
	}
}
