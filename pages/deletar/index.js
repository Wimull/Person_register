import React, { useState } from "react";
import { PageTemplate, Form, Buttons } from "../../components";
import { useForm } from "react-hook-form";
import Styles from "../../styles/title.module.css";
export default function () {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();
	const [formData, setFormData] = useState({});

	function onSubmit(e) {
		e.preventDefault;
		console.log(formData);
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
				{...register("formulário")}
			>
				<Buttons href="/" />
			</Form>
			<div></div>
		</PageTemplate>
	);
}
