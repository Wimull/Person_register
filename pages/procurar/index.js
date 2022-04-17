import React, { useState, useEffect } from "react";
import {
	PageTemplate,
	Form,
	Buttons,
	PeopleTable,
	fetchPerson,
} from "../../components";
import { useForm } from "react-hook-form";
import Styles from "../../styles/title.module.css";

export default function () {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();
	const [formData, setFormData] = useState({});
	const [peopleRegistered, setPeopleRegistered] = useState({});
	const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(0);
	const [data, setData] = useState([{}]);
	const fetch = async () => {
		setData(await fetchPerson());
	};
	useEffect(() => {
		fetch();
	}, []);

	async function onSubmit(e) {
		e.preventDefault;
		let getPacket = Object.keys(formData)
			.filter((key) => formData[key] !== "") //Filters empty strings
			.reduce((res, key) => `${res}${key}=${formData[key]}&`, "?");

		let response = await fetch(
			`http://localhost:3000/api/entry/Register${getPacket}`
		);
		if (response.status == 200) setIsSubmitSuccessful(isSubmitSuccessful + 1);
		let data = await response.json();
		console.log(response, data);
		setPeopleRegistered(data);
	}
	return (
		<PageTemplate>
			<div className={Styles.title}>
				<h1>Procurar</h1>
				<hr />
			</div>
			<Form
				method="GET"
				data={formData}
				setData={setFormData}
				onSubmit={onSubmit}
				isSubmitSuccessful={isSubmitSuccessful}
				{...register("formulário")}
			>
				<Buttons href="/" />
			</Form>
			<PeopleTable data={data} />
			<div>
				<h1>{JSON.stringify(peopleRegistered)}</h1>
			</div>
		</PageTemplate>
	);
}
