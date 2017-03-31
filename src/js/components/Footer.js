import React from 'react';

export default class Footer extends React.Component {
	render() {
		const websitename = "TKeyz";
		return (
			<footer className="float-l full text-center t10">
				{websitename}
			</footer>
		);
	}
}
