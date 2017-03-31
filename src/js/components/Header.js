import React from 'react';

import Title from './Header/Title';

export default class Header extends React.Component {
	render() {
		//console.log(this.props)
		handleChange(e){
			const title = e.target.value;
			this.props.changeTitle(title);
		}
		return (
			<header>
			<Title title={this.props.title} />
			<input onChange={this.handleChange.bind(this)} />
			</header>
		);
	}
}
