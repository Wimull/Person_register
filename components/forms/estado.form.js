import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import React, { useLayoutEffect } from "react";

export function InputEstado(props) {
	const { register, reset } = useForm();
	useLayoutEffect(() => {
		reset({ estado: "" });
	}, [props.isSubmitSuccessful]);

	return (
		<InputMask
			mask="aa"
			placeholder={"Estado (UF)"}
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
