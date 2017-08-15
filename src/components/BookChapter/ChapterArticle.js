import React , { Component } from 'react'; 
import { hashHistory } from 'react-router';

require('./chapterDetail.css');

export default class ChapterArticle extends Component {
	 
	constructor(props) {
	  super(props);   
	}   
	render() {    
		return (
			<article id="article" ref="article">
				<h1>{this.props.chaptername}</h1>
				<div dangerouslySetInnerHTML={{__html: this.props.detail}}>
				</div>	
				 
			</article>
		);

	}
}