import React, { useState, useEffect } from "react";
("react-hook-form");
import {
	PageTemplate,
	Form,
	Buttons,
	PeopleTable,
	fetchAllPersons,
	fetchPersonByCpf,
} from "../../components";
import Styles from "../../styles/title.module.css";

export default function () {
	const [formData, setFormData] = useState({});
	const [peopleRegistered, setPeopleRegistered] = useState([{}]);
	const [id, setId] = useState({});
	const [errorMessage, setErrorMessage] = useState("");
	const [errorMessageVisible, setErrorMessageVisible] = useState("hidden");
	const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(0);

	useEffect(() => {
		getInitialState();
	}, []);

	const getInitialState = async () => {
		setPeopleRegistered(await fetchAllPersons());
	};

	function onSelectChange(action, state) {
		setId({ id: state.id });
	}

	async function onSubmit(e) {
		e.preventDefault;
		console.log(id);
		if (Object.keys(id).length > 0) {
			let res = await fetchPersonByCpf(id, formData, "PUT");
			setErrorMessage("");
			if (res[0] === "error") {
				setId({});
				setPeopleRegistered([{}]);
				setErrorMessageVisible("visible");

				if (res[1] == 504) {
					setErrorMessage(`Erro ${res[1]}: CPF já está cadastrado`);
				} else setErrorMessage(`Erro ${res[1]}: ${JSON.stringify(res[2])}`);
			} else {
				setPeopleRegistered(res);
				setErrorMessage(""), setErrorMessageVisible("hidden");
				setIsSubmitSuccessful(isSubmitSuccessful + 1);
			}
		} else {
			setErrorMessageVisible("visible");
			setErrorMessage("Erro: É necesssário selecionar um elemento da lista");
			await getInitialState();
		}
	}

	return (
		<PageTemplate>
			<div className={Styles.title}>
				<h1>Atualizar</h1>
				<hr />
			</div>
			<Form
				method="PUT"
				data={formData}
				setData={setFormData}
				onSubmit={onSubmit}
				isSubmitSuccessful={isSubmitSuccessful}
			>
				<Buttons href="/" label={"Atualizar"} />
			</Form>
			<div className={Styles.erro} style={{ visibility: errorMessageVisible }}>
				<span>{errorMessage}</span>
			</div>
			<PeopleTable data={peopleRegistered} onSelectChange={onSelectChange} />
		</PageTemplate>
	);
}
