import React from 'react';

import Footer from './Footer';
import Header from './Header';

export default class Layout extends React.Component {

	constructor(){
		super();
		this.state = {name: "Will"};
	}
	changeTitle(title){
		this.setState({title});
	}

	render() {
		const totle = "Welcome";
		const test = "Le chien est bleu, et la terre est jaune !";
		//setTimeout(() => {
		//	this.setState({name: "Bob"});
		//}, 1000)
		return (
			<div>
				<Header changeTitle={this.changeTitle.bind(this)} name={"something"} title={totle} />
				<div>{this.state.name} {test}</div>
				<Footer />
			</div>
		);
	}
}
