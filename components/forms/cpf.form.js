import InputMask from "react-input-mask";
export function InputCpf(props) {
	return (
		<InputMask
			mask="999.999.999-99"
			name={"cpf"}
			placeholder={"CPF"}
			maskChar=""
		/>
	);
}
