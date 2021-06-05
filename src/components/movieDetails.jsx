import React, { Component } from "react";

class MovieDetails extends Component {
	onSave = () => {
		this.props.history.replace("/movies");
	};
	render() {
		return (
			<div>
				<h1>Movie Form {this.props.match.params.id}</h1>
				<button onClick={this.onSave} className="btn btn-primary">
					Save
				</button>
			</div>
		);
	}
}

export default MovieDetails;
