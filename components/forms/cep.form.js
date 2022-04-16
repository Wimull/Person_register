import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
export function InputCep(props) {
	const { register } = useForm();
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
