import React from 'react';

export default class Title extends React.Component {
	render() {
		const name = "Jonas";
		return (
			<h1>
				{this.props.title} {name} !
			</h1>
		);
	}
}
