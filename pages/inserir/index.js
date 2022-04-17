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
	const [peopleRegistered, setPeopleRegistered] = useState([{}]);
	const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(0);
	const getInitialState = async () => {
		setPeopleRegistered(await fetchPerson());
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
		if (response.status === 200) setIsSubmitSuccessful(isSubmitSuccessful + 1);
		let data = [await response.json()];
		data.map((obj) => (obj.id = obj.cpf.replace(/[\.-]/g, "")));
		console.log(response, data);
		setPeopleRegistered(data);
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
				{...register("formulário")}
			>
				<Buttons href="/" label={"Enviar"} />
			</Form>
			<PeopleTable data={peopleRegistered} onSelectChange={onSelectChange} />
		</PageTemplate>
	);
}
