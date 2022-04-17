import React, { useState } from "react";
import { PageTemplate, Form, Buttons, PeopleTable } from "../../components";
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

	async function onSubmit(e) {
		e.preventDefault;
		let postPacket = Object.keys(formData)
			.filter((key) => formData[key] !== "")
			.reduce((res, key) => ((res[key] = formData[key]), res), {});
		postPacket = JSON.stringify(postPacket);
		let response = await fetch("http://localhost:3000/api/entry/Register/", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				"access-control-allow-origin": "*",
			},
			body: postPacket,
		});
		if (response.status === 200) setIsSubmitSuccessful(isSubmitSuccessful + 1);
		let data = await response.json();
		console.log(response, data);
		setPeopleRegistered(data);
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
				<Buttons href="/" />
			</Form>
			<PeopleTable />
			<div>
				<h1>{JSON.stringify(peopleRegistered)}</h1>
			</div>
		</PageTemplate>
	);
}
