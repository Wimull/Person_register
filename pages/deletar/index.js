import React, { useState, useEffect } from "react";
import {
	PageTemplate,
	Form,
	DeleteButtons,
	PeopleTable,
	fetchPerson,
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

	const getInitialState = async () => {
		setPeopleRegistered(await fetchPerson());
	};
	useEffect(() => {
		getInitialState();
	}, []);

	async function onSubmit(e) {
		e.preventDefault;

		let getPacket = Object.keys(formData)
			.filter((key) => formData[key] !== "") //Filters empty strings
			.reduce((res, key) => `${res}${key}=${formData[key]}&`, "?");
		console.log(getPacket, "packet");

		let response = await fetch(
			`http://localhost:3000/api/entry/Register${getPacket}%20`
		);
		let data = await response.json();
		console.log(data);
		data.map((obj) => (obj.id = obj.cpf?.replace(/[\.-]/g, ""))); //Creates and id property so as RowSelect works properly (it only looks for property named "id")
		setPeopleRegistered(data);
	}

	async function onDelete(e) {
		e.preventDefault;
		console.log(formData);
		if (Object.keys(id).length > 0) {
			let res = await fetchPersonByCpf(id, "", "DELETE");
			if (res[0] === "error") {
				setId({});
				setPeopleRegistered([{}]);
				setErrorMessageVisible("visible");
				setErrorMessage(`Erro ${res[1]}: ${JSON.stringify(res[2])}`);
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
	function onSelectChange(action, state) {
		setId({ id: state.id });
	}
	return (
		<PageTemplate>
			<div className={Styles.title}>
				<h1>Deletar</h1>
				<hr />
			</div>
			<Form
				method="DELETE"
				data={formData}
				setData={setFormData}
				onSubmit={onSubmit}
				isSubmitSuccessful={isSubmitSuccessful}
			>
				<DeleteButtons href="/" onDelete={onDelete} />
			</Form>
			<div className={Styles.erro} style={{ visibility: errorMessageVisible }}>
				<span>{errorMessage}</span>
			</div>
			<PeopleTable data={peopleRegistered} onSelectChange={onSelectChange} />
		</PageTemplate>
	);
}
