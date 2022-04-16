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

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	function handleDataChange(e) {
		console.log(props.data);
		switch (e.target.name) {
			case "estado":
				console.log(e.target.value.toUpperCase());
				setValue("estado", e.target.value.toUpperCase());
				props.setData({
					...props.data,
					[e.target.name]: e.target.value.toUpperCase(),
				});
				break;

			case "cpf":
				setValue("cpf", e.target.value);
				props.setData({
					...props.data,
					[e.target.name]: e.target.value,
				});
				break;
			case "cep":
				setValue("cep", e.target.value);
				props.setData({
					...props.data,
					[e.target.name]: e.target.value,
				});
				break;

			default:
				props.setData({
					...props.data,
					[e.target.name]: e.target.value.trim(),
				});
		}
	}

	function onSubmit(e) {
		e.preventDefault;
		console.log(props.data);
	}
	async function checkCep() {
		if (!/[\d]{5}-[\d]{3}$/.test(props.data.cep)) return console.log("error");
		let query = props.data.cep.replace(/-/g, "");
		let response = await fetch(`https://viacep.com.br/ws/${query}/json`);
		response.json().then((json) => {
			let { logradouro, localidade, uf } = json;
			setValue("logradouro", logradouro);
			setValue("cidade", localidade);
			setValue("estado", uf);

			console.log(props.data);
		});
	}

	return (
		<form onSubmit={handleSubmit(props.onSubmit)}>
			<div className={Styles.forms}>
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
					placeholder="CEP"
					onChange={handleDataChange}
					onBlur={checkCep}
					{...register("cep", {
						pattern: {
							value: /[\d]{5}-[\d]{3}$/,
							message: "CEP inválido. ",
						},
						required: {
							value: requireAllCamps,
							message: "CEP não foi preenchido. ",
						},
						onChange: handleDataChange,
						onBlur: checkCep,
					})}
				/>
				<InputCpf
					placeholder={"CPF"}
					name={"cpf"}
					onChange={handleDataChange}
					{...register("cpf", {
						pattern: {
							value: /[\d]{3}\.[\d]{3}\.[\d]{3}-[\d]{2}$/,
							message: "CPF inválido. ",
						},
						required: {
							value: requireAllCamps,
							message: "Cpf não foi preenchido. ",
						},
						onChange: handleDataChange,
					})}
				/>
				<InputEstado
					placeholder={"Estado"}
					name={"estado"}
					onChange={handleDataChange}
					{...register("estado", {
						required: {
							value: requireAllCamps,
							message: "Estado não foi preenchido. ",
						},
						pattern: {
							value:
								/(A[CLPM])|(BA)|(CE)|(DF)|(M[ATSG])|(P[ABREI])|(R[JNSOR])|(S[CPE])|(TO)/,
							message: "Estado inválido ",
						},
						onChange: handleDataChange,
					})}
				/>
				<input
					placeholder={"Cidade"}
					name={"cidade"}
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
					{...register("telefone", {
						required: {
							value: requireAllCamps,
							message: "Telefone não foi preenchido. ",
						},
						onChange: handleDataChange,
					})}
				/>
			</div>
			<div className={Styles.erros}>
				<span>{errors.nome?.message}</span>
				<span>{errors.sobrenome?.message}</span>
				<span>{errors.nacionalidade?.message}</span>
				<span>{errors.cep?.message}</span>
				<span>{errors.cpf?.message}</span>
				<span>{errors.estado?.message}</span>
				<span>{errors.cidade?.message}</span>
				<span>{errors.logradouro?.message}</span>
				<span>{errors.email?.message}</span>
				<span>{errors.telefone?.message}</span>
			</div>
			<div>{props.children}</div>
		</form>
	);
}
