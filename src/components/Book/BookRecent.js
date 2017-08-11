import React, { Component } from 'react';
import { Link } from 'react-router';
import Time from '../../utils/Time';

export default class BookRecent extends Component {
	render() {
		const {lastchapterid, bookId} = this.props;

		return (
			<section className="book-recent">
				<Link to={`/chapter/${bookId}/${lastchapterid}`}>
					<span className="title">{this.props.lastchapter}</span>
				</Link>
				<p className="time">{Time(this.props.lastupdate)}</p>
				<i>最新</i>
			</section>
		);
	}
}

 
