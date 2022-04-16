import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
export function InputCep(props) {
	const { register } = useForm();
	return (
		<InputMask
			mask="99999-999"
			placeholder={"CEP"}
			name={props.name}
			{...register("cep", {
				required: { value: props.required, message: "Cep não foi preenchido." },
				onChange: props.onChange,
				onBlur: props.onBlur,
			})}
		/>
	);
}
