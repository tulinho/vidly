import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class RegisterForm extends Form {
	state = {
		data: {
			username: "",
			password: "",
			name: "",
		},
		errors: {},
	};
	schema = {
		username: Joi.string().email().required().label("Username"),
		password: Joi.string()
			.alphanum()
			.min(6)
			.max(30)
			.required()
			.label("Password"),
		name: Joi.string().min(3).required().label("Name"),
	};
	doSubmit() {
		console.log(this.state.data);
	}
	render() {
		return (
			<div>
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("username", "Username")}
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
