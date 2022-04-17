import React, { useState, useEffect } from "react";
("react-hook-form");
import {
	PageTemplate,
	Form,
	Buttons,
	PeopleTable,
	fetchPerson,
	fetchPersonByCpf,
} from "../../components";
import Styles from "../../styles/title.module.css";

export default function () {
	const [formData, setFormData] = useState({});
	const [peopleRegistered, setPeopleRegistered] = useState([{}]);
	const [id, setId] = useState({});
	useEffect(() => {
		getInitialState();
	}, []);
	const getInitialState = async () => {
		setPeopleRegistered(await fetchPerson());
	};

	function onSelectChange(action, state) {
		setId({ id: state.id });
	}

	async function onSubmit(e) {
		e.preventDefault;
		if (id) {
			setPeopleRegistered(await fetchPersonByCpf(id, formData, "PUT"));
		}
		console.log(formData);
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
			>
				<Buttons href="/" label={"Atualizar"} />
			</Form>
			<PeopleTable data={peopleRegistered} onSelectChange={onSelectChange} />
		</PageTemplate>
	);
}
