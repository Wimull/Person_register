const mongoose = require("mongoose");
require("dotenv").config();
const { Schema } = mongoose;

const personSchema = new Schema({
	nome: { type: String, required: true },
	sobrenome: { type: String, required: true },
	nacionalidade: { type: String, required: true },
	cep: { type: String, required: true },
	cpf: { type: String, required: true, unique: true },
	estado: { type: String, required: true },
	cidade: { type: String, required: true },
	logradouro: { type: String, required: true },
	email: { type: String, required: true },
	telefone: { type: String, required: true },
});
mongoose.connect(process.env.URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

module.exports =
	mongoose.models.Person || mongoose.model("Person", personSchema, "Register");
