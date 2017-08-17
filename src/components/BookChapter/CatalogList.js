import React, { Component, propTypes } from 'react';
import { Link } from 'react-router';
import styles from './catalog.css'
//require('./catalog.css')

const CatalogList = (props) => {
	const { data, bookId, count } = props;
	const list = data
	return (
		<section className={styles.book_directory}>
			<div className={styles.catalist} >
				<ul>
					{
						list.map((item,key)=>{
							if(item.chaptertype===1){
								return (<li className={styles.grade_01} key={key}>{item.chaptername}</li>)
							}else{
								return (<li className={styles.grade_02} key={key}><Link className = {styles.link} to={`/chapter/${bookId}/${item.chapterid}`}>{item.chaptername}</Link></li>)
							}
						})
					}
				</ul>
			</div>
		</section>
	);	
}

export default CatalogList;