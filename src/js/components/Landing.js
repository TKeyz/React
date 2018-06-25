import React, { Component } from "react";

import {Route, Switch, Redirect} from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
//PAGES
import Featured from './Pages/Featured';
import Work from './Pages/Work';
import Contact from './Pages/Contact';
import NotFound from './Pages/NotFound';

class Landing extends Component {

	constructor(){
		super();
		this.state = {title: "Welcome"};
	}

	render() {

		return (
				<div>
					<Header title={this.state.title} />
					<Switch>
						<Route exact path="/" component={Work} />
						<Route path="/featured" component={Featured} />
						<Route path="/contact" component={Contact} />
			        	<Redirect to="/" />
					</Switch>
					<Footer />
				</div>
		);
	}
}

export default Landing;