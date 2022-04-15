const mongoose = require("mongoose");
const { Schema } = mongoose;

const personSchema = new Schema({
	nome: { type: String, required: true },
	sobrenome: { type: String, required: true },
	nacionalidade: { type: String, required: true },
	cep: { type: String, required: true },
	estado: { type: String, required: true },
	cidade: { type: String, required: true },
	logradouro: { type: String, required: true },
	email: { type: String, required: true },
	telefone: { type: String, required: true },
});

module.exports =
	mongoose.models.Person || mongoose.model("Person", personSchema, "Register");
