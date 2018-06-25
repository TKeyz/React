import React from 'react';

export default class Intro extends React.Component {
	
	render() {
		return (
			<h1>
				{this.props.name}
			</h1>
		);
	}
}
