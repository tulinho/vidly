import React, { Component } from "react";
import Input from "./input";
import Select from "./select";
import Joi from "joi-browser";

class Form extends Component {
	state = { data: [], errors: [] };
	schema = {};

	validate = () => {
		const errors = {};
		const options = { abortEarly: false };
		const { data } = this.state;
		const { error } = Joi.validate(data, this.schema, options);
		if (!error) return null;
		for (
			let countError = 0;
			countError < error.details.length;
			countError++
		) {
			errors[error.details[countError].context.key] =
				error.details[countError].message;
		}
		return errors;
	};

	validateProperty({ name, value }) {
		const data = { [name]: value };
		const propSchema = { [name]: this.schema[name] };
		const { error } = Joi.validate(data, propSchema);
		if (!error) return null;
		return error.details[0].message;
	}

	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty(input);
		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];

		const data = { ...this.state.data };
		data[input.name] = input.value;

		this.setState({ data, errors });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors !== null) return;
		this.setState({ errors: {} });
		this.doSubmit();
	};

	renderInput(name, label, type = "text") {
		const { data, errors } = this.state;
		return (
			<Input
				name={name}
				label={label}
				error={errors[name]}
				value={data[name]}
				type={type}
				onChange={this.handleChange}
			></Input>
		);
	}

	renderSelect(name, label, options) {
		const { data, errors } = this.state;
		return (
			<Select
				name={name}
				label={label}
				error={errors[name]}
				value={data[name]}
				options={options}
				onChange={this.handleChange}
			></Select>
		);
	}

	renderSubmitButton(label) {
		return (
			<button disabled={this.validate()} className="btn btn-primary">
				{label}
			</button>
		);
	}
}

export default Form;
