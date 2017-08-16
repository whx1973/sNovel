import React, { Component, propTypes } from 'react';
import { Link } from 'react-router';
require('./catalog.css')

const CatalogList = (props) => {
	const { data, bookId, count } = props;
	const list = data
	return (
		<section className="book-directory">
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

export default CatalogList;