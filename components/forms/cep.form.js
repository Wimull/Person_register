import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import { useLayoutEffect } from "react";
export function InputCep(props) {
	const { register, reset } = useForm();
	useLayoutEffect(() => {
		reset({ cep: "" });
	}, [props.isSubmitSuccessful]);

	return (
		<InputMask
			mask="99999-999"
			placeholder={"CEP"}
			name={"cep"}
			maskChar=""
			{...register("cep", {
				onChange: props.onChange,
				onBlur: props.onBlur,
			})}
		/>
	);
}
