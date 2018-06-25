import React from 'react';

export default class Footer extends React.Component {
	render() {
		const websitename = "TKeyz";
		var list = [
			<div />,
			<div />,
			<div />,
		];
		return (
			<footer className="float-l full text-center t10">
				{websitename}
			</footer>
		);
	}
}
