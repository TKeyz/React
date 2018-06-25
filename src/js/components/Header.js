import React from 'react';

import Title from './Header/Title';
import Menubar from './Header/Menubar';

export default class Header extends React.Component {

	render() {
		return (
			<header>
				<Title title={this.props.title} />
				<Menubar />
			</header>
		);
	}
}
