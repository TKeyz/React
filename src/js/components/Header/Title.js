import React from 'react';

export default class Title extends React.Component {
	render() {
		const name = "Jonas";
		return (
			<h1 className="min-marg-top small-marg-btm t-18 text-center">
				{this.props.title}
			</h1>
		);
	}
}
