import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import React, { useState } from "react";

export function InputEstado(props) {
	const { register } = useForm();

	return (
		<InputMask
			mask="aa"
			placeholder={"Estado"}
			name={"estado"}
			value={props.value}
			maskChar=""
			{...register("estado", {
				onChange: props.onChange,
				value: props.value,
			})}
		/>
	);
}
