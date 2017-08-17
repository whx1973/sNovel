import React, { Component } from 'react';
import { Link } from 'react-router';
import Time from '../../utils/Time';
import styles from './BookDetail.css';

export default class BookRecent extends Component {
	render() {
		const {lastchapterid, bookId} = this.props;

		return (
			<section className={styles.book_recent}>
				<Link className = {styles.book_recent_link} to={`/chapter/${bookId}/${lastchapterid}`}>
					<span className={styles.book_recent_title}>{this.props.lastchapter}</span>
				</Link>
				<p className={styles.book_recent_time}>{Time(this.props.lastupdate)}</p>
				<i  className={styles.book_recent_i}>最新</i>
			</section>
		);
	}
}

 
