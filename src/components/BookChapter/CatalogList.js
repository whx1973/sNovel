import React, { Component, propTypes } from 'react';
import { Link } from 'react-router';
require('./catalog.css')

export default class CatalogList extends Component {
	constructor(props){
		super(props);
		 
	}

	render() {
		const { data, bookId, count } = this.props;
		const list = data;
		return (
			<section className="book-directory" onScroll = {this.handleScroll} ref="bookDirectory">
				<div className="catalist">
					<ul>
						{
							list.map((item,key)=>{
								if(item.chaptertype===1){
									return (<li className="grade_01" key={key}>{item.chaptername}</li>)
								}else{
									return (<li className="grade_02" key={key}><Link to={`/chapter/${bookId}/${item.chapterid}`}>{item.chaptername}</Link></li>)
								}
							})
						}
					</ul>
				</div>
			</section>
		);
	}
} 