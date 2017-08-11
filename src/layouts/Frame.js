import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer'; 

export default class Frame extends Component {

	render() {
		return (
			<div className='wrapper'>
				<Header />
				{this.props.children}
				<Footer />
			</div>
		);
	}

}