//TODO add validation to all filds / add fetching

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InputCpf } from "./cpf.form";
import { InputCep } from "./cep.form";
import { InputEstado } from "./estado.form";
import Styles from "./forms.module.css";

const defaultValues = {
	nome: "",
	sobrenome: "",
	nacionalidade: "",
	cep: "",
	cpf: "",
	cidade: "",
	logradouro: "",
	email: "",
	telefone: "",
};

export function Form(props) {
	let requireAllCamps = true;
	if (props.method !== "POST") requireAllCamps = false;

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		clearErrors,
		formState: { errors },
	} = useForm();

	const [cepTouched, setCepTouched] = useState({});

	useEffect(() => {
		reset(defaultValues);
		props.setData({});
	}, [props.isSubmitSuccessful]);

	function handleDataChange(e) {
		switch (
			e.target.name //The two first case are there for they need to be treated before passing to setFormData
		) {
			case "estado":
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
					[e.target.name]: e.target.value.replace(/[\.-]/g, ""),
				});
				break;
			case "cep": //For some reason the default opcition wasn't working properly for this form, so this is a workaround for that
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

	async function checkCep() {
		//Checks cep info in an external API and then changes the current form to match the results.
		if (!props.data.cep) return;
		let query = props.data.cep?.replace(/-/g, "");
		let response = await fetch(`https://viacep.com.br/ws/${query}/json`);
		response.json().then((json) => {
			let { logradouro, localidade, uf } = json;
			console.log(logradouro, localidade, uf);
			setValue("logradouro", logradouro, {});
			setValue("cidade", localidade, {});
			setValue("estado", uf, {});
			props.setData({
				...props.data,
				logradouro: logradouro,
				cidade: localidade,
				estado: uf,
			});
			clearErrors(["logradouro", "cidade", "estado"]);
		});
	}
	useEffect(() => {
		checkCep();
	}, [cepTouched]);

	return (
		//form submition is done externally so as to better manipulate the button and to fragment this component
		// "cep", "estado" and "cidade" all have their external component ((...).form.js) so as to implement input mask
		<form onSubmit={handleSubmit(props.onSubmit)}>
			<div className={Styles.forms}>
				<input
					placeholder={"Nome"}
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
					onBlur={setCepTouched}
					isSubmitSuccessful={props.isSubmitSuccessful}
					{...register("cep", {
						pattern: {
							value: /([\d]{5}-[\d]{3}$)|^$/,
							message: "CEP inválido. ",
						},
						required: {
							value: requireAllCamps,
							message: "CEP não foi preenchido. ",
						},
						onChange: handleDataChange,
						onBlur: setCepTouched,
					})}
				/>
				<InputCpf
					placeholder={"CPF"}
					name={"cpf"}
					onChange={handleDataChange}
					isSubmitSuccessful={props.isSubmitSuccessful}
					{...register("cpf", {
						pattern: {
							value: /([\d]{3}\.[\d]{3}\.[\d]{3}-[\d]{2}$)|^$/,
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
					value={props.data.estado}
					isSubmitSuccessful={props.isSubmitSuccessful}
					{...register("estado", {
						required: {
							value: requireAllCamps,
							message: "Estado não foi preenchido. ",
						},
						pattern: {
							value:
								/(A[CLPM])|(BA)|(CE)|(DF)|(ES)|(GO)|(M[ATSG])|(P[ABREI])|(R[JNSOR])|(S[CPE])|(TO)|^$/,
							message: "Estado inválido ",
						},
						onChange: handleDataChange,
						setValueAs: (v) => v.toUpperCase(),
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
