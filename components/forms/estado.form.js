import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import React, { useState } from "react";

export function InputEstado(props) {
	const { register } = useForm();
	const estados = [
		"AC",
		"AL",
		"AP",
		"AM",
		"BA",
		"CE",
		"DF",
		"ES",
		"GO",
		"MA",
		"MT",
		"MS",
		"MG",
		"PA",
		"PB",
		"PR",
		"PE",
		"PI",
		"RJ",
		"RN",
		"RS",
		"RO",
		"RR",
		"SC",
		"SP",
		"SE",
		"TO",
	];

	return (
		<InputMask
			mask="aa"
			placeholder={"Estado"}
			name={props.name}
			{...register("estado", {
				required: {
					value: props.required,
					message: "Estado não foi preenchido. ",
				},
				onChange: props.onChange,
			})}
		/>
	);
}
