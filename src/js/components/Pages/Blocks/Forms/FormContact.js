import React, { Component } from "react";

class FormContact extends Component {

	state = {
		Firstname: "1",
		FirstnameError: "",
		Lastname: "",
		LastnameError: "",
		Email: "",
		EmailError: "",
		Phone: "",
		PhoneError: "",
		Company: "",
		CompanyError: "",
		Message: "",
		MessageError: "",

	};

	change = e => {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.props.onChange({	[name] : value});
		this.setState({
			[name]: value
		});
	};

	onSubmit = e => {
		e.preventDefault();
		this.props.onSubmit(this.state);
		//console.log(this.state);
		this.setState({
			Firstname: "1",
			FirstnameError: "",
			Lastname: "",
			LastnameError: "",
			Email: "",
			EmailError: "",
			Phone: "",
			PhoneError: "",
			Company: "",
			CompanyError: "",
			Message: "",
			MessageError: ""
		});
	};

	render() {
		return (
			<form>
				<fieldset>
					<div><input name="Firstname" type="text" value={this.state.Firstname} onChange={e => this.change(e)} placeholder="Your firstname" /></div>
					<div><input name="Lastname" type="text" value={this.state.Lastname} onChange={e => this.change(e)} placeholder="And Lastname" /></div>
					<div><input name="Email" type="email" value={this.state.Email} onChange={e => this.change(e)} placeholder="Then your email" /></div>
					<div><input name="Phone" type="text" value={this.state.Phone} onChange={e => this.change(e)} placeholder="Also phone number" /></div>
					<div><input name="Company" type="text" value={this.state.Company} onChange={e => this.change(e)} placeholder="If you belong to a Company" /></div>
					<div><textarea name="Message" value={this.state.Message} onChange={e => this.Change(e)} placeholder="Write us a few words to tell how great we are" /></div>
					<div><button onClick={e => this.onSubmit(e)}>Submit</button></div>
				</fieldset>
			</form>
		);
	}
}

export default FormContact;
