import React from 'react';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

class Layout extends Component {

	constructor(){
		super();
		this.state = {title: "Welcome", name: "Hello"};
	}
	changeTitle(name){
		this.setState({name});
	}

	render() {
		//setTimeout(() => {
		//	this.setState({name: "Bob"});
		//}, 1000)
		return (
			<div className="blk-box-70 hmarg-auto">
				<Header title={this.state.title} />
				<Content changeTitle={this.changeTitle.bind(this)} name={this.state.name} />
				<div></div>
				<Footer />
			</div>
		);
	}
}

export default Layout;