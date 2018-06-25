import React, { Component } from 'react';

import Content from './Blocks/Content';

class Featured extends Component {

	constructor(){
		super();
		this.state = {name: "Hello"};
	}
	changeTitle(name){
		this.setState({name});
	}

	handleChange(e){
		const name = e.target.value;//console.log(this.props);
		this.props.changeTitle(name);
	}

	render() {
		const test = "Le chien est bleu, et la terre est jaune !";

		return (
			<Content changeTitle={this.changeTitle.bind(this)} name={this.state.name} />
		);
	}
}

export default Featured;
