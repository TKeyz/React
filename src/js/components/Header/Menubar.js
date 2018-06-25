import React from 'react';
import {Link} from 'react-router-dom';

export default class Menubar extends React.Component {
	render() {
		
		return (
			<nav>
				<Link to="work">Work</Link>
				<Link to="featured">Featured</Link>
				<Link to="contact">Contact</Link>
			</nav>

		);
	}
}
