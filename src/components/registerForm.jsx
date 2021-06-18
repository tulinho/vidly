import React from "react";
import { Redirect } from "react-router";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Form from "./common/form";
import auth from "../services/authService";
import { register } from "../services/userService";

class RegisterForm extends Form {
	state = {
		data: {
			email: "",
			password: "",
			name: "",
		},
		errors: {},
	};
	schema = {
		email: Joi.string().email().required().label("Username"),
		password: Joi.string()
			.alphanum()
			.min(6)
			.max(30)
			.required()
			.label("Password"),
		name: Joi.string().min(3).required().label("Name"),
	};
	async doSubmit() {
		try {
			const { data: user } = this.state;
			await register(user);
			window.location = "/";
		} catch (error) {
			if (!(error.response && error.response.status === 400)) return;
			this.displayErrorMessages(error);
		}
	}
	displayErrorMessages(error) {
		toast.error(error.response.data);
		const errors = {
			...this.state.errors,
			...{ email: error.response.data },
		};
		this.setState({ errors });
	}
	render() {
		if (auth.getCurrentUser()) return <Redirect to="/" />;
		return (
			<div>
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("email", "Username")}
					{this.renderInput("password", "Password", "password")}
					{this.renderInput("name", "Name")}
					<br />
					{this.renderSubmitButton("Register")}
				</form>
			</div>
		);
	}
}

export default RegisterForm;
