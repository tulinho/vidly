import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class LoginForm extends Form {
	state = {
		data: {
			username: "",
			password: "",
		},
		errors: {},
	};

	schema = {
		username: Joi.string().required().label("Username"),
		password: Joi.string().required().label("Password"),
	};

	doSubmit() {
		console.log("Submited");
	}
	render() {
		return (
			<div>
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("username", "Username")}
					{this.renderInput("password", "Password", "password")}
					<br />
					{this.renderSubmitButton("Login")}
				</form>
			</div>
		);
	}
}

export default LoginForm;
