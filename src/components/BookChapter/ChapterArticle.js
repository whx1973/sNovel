import React , { Component } from 'react'; 
import { hashHistory } from 'react-router';

require('./chapterDetail.css');

const ChapterArticle = (props) => {
	return (
		<article id="article">
			<h1>{props.chaptername}</h1>
			<div dangerouslySetInnerHTML={{__html: props.detail}}>
			</div>
		</article>
	);
}
export default ChapterArticle;