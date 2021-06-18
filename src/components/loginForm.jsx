import React from "react";
import { Redirect } from "react-router";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";

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

	async doSubmit() {
		try {
			const { data } = this.state;
			await auth.login(data.username, data.password);
			const { state } = this.props.location;
			window.location = (state && state.from.pathname) || "/";
		} catch (error) {
			if (!(error.response && error.response.status === 400)) return;
			this.displayErrorMessages(error);
		}
	}
	displayErrorMessages(error) {
		const { data: msg } = error.response;
		toast.error(msg);
		const errors = {
			...this.state.errors,
			...{ username: msg, password: msg },
		};
		this.setState({ errors });
	}
	render() {
		if (auth.getCurrentUser()) return <Redirect to="/" />;
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
