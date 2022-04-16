import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
export function InputCpf(props) {
	const { register } = useForm();
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
