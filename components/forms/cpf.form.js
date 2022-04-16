import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
export function InputCpf(props) {
	const { register } = useForm();
	return (
		<InputMask
			mask="999.999.999-99"
			placeholder={"CPF"}
			name={props.name}
			{...register("cpf", {
				required: { value: props.required, message: "Cpf não foi preenchido." },
				onChange: props.onChange,
			})}
		/>
	);
}
