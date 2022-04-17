import React, { useState, useEffect } from "react";
import {
	PageTemplate,
	Form,
	Buttons,
	PeopleTable,
	fetchAllPersons,
} from "../../components";
import Styles from "../../styles/title.module.css";

export default function () {
	const [formData, setFormData] = useState({});
	const [peopleRegistered, setPeopleRegistered] = useState([{}]);
	const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(0);
	const [errorMessage, setErrorMessage] = useState("");
	const [errorMessageVisible, setErrorMessageVisible] = useState("hidden");

	const getInitialState = async () => {
		setPeopleRegistered(await fetchAllPersons());
	};
	useEffect(() => {
		getInitialState();
	}, []);

	async function onSubmit(e) {
		e.preventDefault;
		let postPacket = Object.keys(formData)
			.filter((key) => formData[key] !== "")
			.reduce((res, key) => ((res[key] = formData[key]), res), {});
		postPacket = JSON.stringify(postPacket);
		let response = await fetch("http://localhost:3000/api/entry/Register/", {
			method: "POST",
			headers: {
				Accept: "*/*",
				"Content-type": "application/json",
				"access-control-allow-origin": "*",
			},
			body: postPacket,
		});
		let data = [await response.json()];
		if (response.status === 406) {
			setErrorMessageVisible("visible");
			setErrorMessage("Erro: CPF já está cadastrado");
			setPeopleRegistered([{}]);
			return;
		} else if (response.status === 200) {
			setErrorMessageVisible("hidden");
			setErrorMessage("");
			setIsSubmitSuccessful(isSubmitSuccessful + 1);
			data.map((obj) => (obj.id = obj.cpf.replace(/[\.-]/g, "")));
			setPeopleRegistered(data);
		} else {
			setErrorMessageVisible("visible");
			setErrorMessage(`Erro ${response.status}: ${JSON.stringify(data)}`);
			setPeopleRegistered([{}]);
		}
	}

	function onSelectChange(action, state) {
		console.log(action, state);
	}

	return (
		<PageTemplate>
			<div className={Styles.title}>
				<h1>Inserir</h1>
				<hr />
			</div>
			<Form
				method="POST"
				data={formData}
				setData={setFormData}
				onSubmit={onSubmit}
				isSubmitSuccessful={isSubmitSuccessful}
			>
				<Buttons href="/" label={"Enviar"} />
			</Form>
			<div className={Styles.erro} style={{ visibility: errorMessageVisible }}>
				<span>{errorMessage}</span>
			</div>
			<PeopleTable data={peopleRegistered} onSelectChange={onSelectChange} />
		</PageTemplate>
	);
}
