import InputMask from "react-input-mask";
export function InputCep(props) {
	return (
		<InputMask
			mask="99999-999"
			placeholder={"CEP"}
			name={props.name}
			maskChar=""
		/>
	);
}
