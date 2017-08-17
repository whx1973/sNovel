import React , { Component } from 'react'; 
import { hashHistory } from 'react-router';
import styles from './chapterDetail.css'
//require('./chapterDetail.css');

const ChapterArticle = (props) => {
	return (
		<article id="article" className ={styles.article}>
			<h1  className ={styles.article_title}>{props.chaptername}</h1>
			<div  className ={styles.article_content} dangerouslySetInnerHTML={{__html: props.detail}}>
			</div>
		</article>
	);
}
export default ChapterArticle;