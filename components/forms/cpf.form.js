import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import { useLayoutEffect } from "react";
export function InputCpf(props) {
	const { register, reset } = useForm();
	useLayoutEffect(() => {
		reset({ cpf: "" });
	}, [props.isSubmitSuccessful]);
	return (
		<InputMask
			mask="999.999.999-99"
			name={"cpf"}
			maskChar=""
			placeholder={"CPF"}
			{...register("cpf", {
				onChange: props.onChange,
			})}
		/>
	);
}
