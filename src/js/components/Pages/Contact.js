import React, { Component } from "react";

import FormContact from './Blocks/Forms/FormContact';

class Contact extends Component {

	state = {
		fields: {}
 	};

 	onChange = updatedValue => {
 		this.setState({
 			fields: {
 				...this.state.fields,
 				...updatedValue
 			}
 		});
 	};
 	onSubmit = (fields) => {
 		this.setState({
 			fields
 		});
 		console.log('App got: ', fields);
 	};

	render() {
		return (
			<div className="float-l full">
				<h1 className="float-l full">Contact</h1>
				<FormContact onChange={fields => this.onSubmit(fields)} />
				<p>
				{JSON.stringify(this.state.fields, null, 2)}
				</p>
			</div>
		);
	}
}

export default Contact;