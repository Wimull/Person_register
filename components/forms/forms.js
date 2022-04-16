//TODO add validation to all filds / add fetching

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InputCpf } from "./cpf.form";
import { InputCep } from "./cep.form";
import { InputEstado } from "./estado.form";
import Styles from "./forms.module.css";

export function Form(props) {
	let requireAllCamps = true;
	if (props.method !== "POST") requireAllCamps = false;
	const dataSchema = {
		nome: "",
		sobrenome: "",
		nacionalidade: "",
		cep: "",
		cpf: "",
		estado: "",
		cidade: "",
		logradouro: "",
		email: "",
		telefone: "",
	};

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();
	const [data, setData] = useState(dataSchema);

	function handleDataChange(e) {
		if (e.target.name === "estado") {
			console.log(data);
			setData({
				...data,
				[e.target.name]: e.target.value.toUpperCase(),
			});
		} else {
			setData({
				...data,
				[e.target.name]: e.target.value.trim(),
			});
		}
	}
	function onSubmit(e) {
		console.log(errors);
		e.preventDefault;
		console.log(data);
	}
	async function checkCep() {
		if (!/[\d]{5}-[\d]{3}$/.test(data.cep)) return console.log("error");
		let query = data.cep.replace(/-/g, "");
		let response = await fetch(`https://viacep.com.br/ws/${query}/json`);
		response.json().then((json) => {
			let { logradouro, localidade, uf } = json;
			setValue("logradouro", logradouro);
			setValue("cidade", localidade);
			setValue("estado", uf);

			console.log(data);
		});
	}

	return (
		<form>
			<input
				placeholder={"nome"}
				name={"nome"}
				{...register("nome", {
					required: {
						value: requireAllCamps,
						message: "Nome não foi preenchido. ",
					},
					onChange: handleDataChange,
				})}
			/>
			<input
				placeholder={"Sobrenome"}
				name={"sobrenome"}
				onChange={handleDataChange}
				{...register("sobrenome", {
					required: {
						value: requireAllCamps,
						message: "Sobrenome não foi preenchido. ",
					},
					onChange: handleDataChange,
				})}
			/>
			<input
				placeholder={"Nacionalidade"}
				name={"nacionalidade"}
				onChange={handleDataChange}
				{...register("nacionalidade", {
					required: {
						value: requireAllCamps,
						message: "Nacionalidade não foi preenchida. ",
					},
					onChange: handleDataChange,
				})}
			/>
			<InputCep
				name={"cep"}
				onChange={handleDataChange}
				onBlur={checkCep}
				required={requireAllCamps}
			/>
			<InputCpf
				name={"cpf"}
				onChange={handleDataChange}
				required={requireAllCamps}
			/>
			<InputEstado
				placeholder={"Estado"}
				name={"estado"}
				onChange={handleDataChange}
			/>
			<input
				placeholder={"Cidade"}
				name={"cidade"}
				onChange={handleDataChange}
				{...register("cidade", {
					required: {
						value: requireAllCamps,
						message: "Cidade não foi preenchida. ",
					},
					onChange: handleDataChange,
				})}
			/>
			<input
				placeholder={"Logradouro"}
				name={"logradouro"}
				onChange={handleDataChange}
				{...register("logradouro", {
					required: {
						value: requireAllCamps,
						message: "Logradouro não foi preenchido. ",
					},
					onChange: handleDataChange,
				})}
			/>
			<input
				placeholder={"email"}
				name={"email"}
				onChange={handleDataChange}
				{...register("email", {
					required: {
						value: requireAllCamps,
						message: "Email não foi preenchido. ",
					},
					onChange: handleDataChange,
				})}
			/>
			<input
				placeholder={"Telefone"}
				name={"telefone"}
				onChange={handleDataChange}
				{...register("telefone", {
					required: {
						value: requireAllCamps,
						message: "Telefone não foi preenchido. ",
					},
					onChange: handleDataChange,
				})}
			/>
			<p className={Styles.p}>
				{errors.nome?.message}
				{errors.sobrenome?.message}
				{errors.nacionalidade?.message}
				{errors.cep?.message}
				{errors.cpf?.message}
				{errors.estado?.message}
				{errors.cidade?.message}
				{errors.logradouro?.message}
				{errors.email?.message}
				{errors.telefone?.message}
			</p>
			<button onClick={handleSubmit(onSubmit)}>Submit</button>
		</form>
	);
}
