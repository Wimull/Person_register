import React, { useState, useEffect } from "react";
import {
	PageTemplate,
	Form,
	Buttons,
	PeopleTable,
	fetchPerson,
} from "../../components";
import { useRowSelect } from "@table-library/react-table-library/select";
import Styles from "../../styles/title.module.css";

export default function () {
	const [data, setData] = useState([{}]);
	useEffect(() => {
		fetch();
	}, []);
	const fetch = async () => {
		setData(await fetchPerson());
	};
	console.log(data, "data");

	function onSelectChange(action, state) {
		console.log(action, state);
	}

	const [formData, setFormData] = useState({});

	function onSubmit(e) {
		e.preventDefault;
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
				<Buttons href="/" />
			</Form>
			<PeopleTable data={data} onSelectChange={onSelectChange} />
		</PageTemplate>
	);
}
