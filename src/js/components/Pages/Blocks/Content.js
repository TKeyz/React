import React, {Component} from "react";

import Intro from './Intro';

class Content extends Component {

	handleChange(e){
		const name = e.target.value;
		this.props.changeTitle(name);
	}

	render() {

		const test = "Le chien est bleu, et la terre est jaune !";

		return (
			<article className="screen-rsp-600">
				<Intro className="float-l full" name={this.props.name} />
				<input onChange={this.handleChange.bind(this)} value={this.props.name} />
				<div className="float-l full">{test}</div>
			</article>
		);
	}
}

export default Content;