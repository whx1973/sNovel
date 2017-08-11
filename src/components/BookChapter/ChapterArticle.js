import React , { Component } from 'react'; 
import { hashHistory } from 'react-router';

require('./chapterDetail.css');

export default class ChapterArticle extends Component {
	 
	constructor(props) {
	  super(props);  
	  this.showBtn = this.showBtn.bind(this);
	}  
	loadData(direct){
		const {bookId,prevChapter,nextChapter} = this.props;
		if(direct==='up'){
			this.props.getPrevOrNext(bookId,prevChapter);
			hashHistory.push(`/chapter/${bookId}/${prevChapter}`); 
		}else{
			this.props.getPrevOrNext(bookId,nextChapter);
			hashHistory.push(`/chapter/${bookId}/${nextChapter}`);
		}
	}
	showBtn(){
		const {nextChapter,prevChapter} = this.props;
		 
		if(nextChapter&&prevChapter){
			return (<div>
					<input type='button' value='加载上一章' onClick = {this.loadData.bind(this,'up')}/>
					<input type='button' value='加载下一章' onClick = {this.loadData.bind(this)}/> 
				</div>
			);
		}
		else if(prevChapter){
			return ( <input type='button' value='加载上一章' onClick = {this.loadData.bind(this,'up')}/> );
		}
		else if(nextChapter){
			return ( <input type='button' value='加载下一章' onClick = {this.loadData.bind(this)}/> );
		}
		else{
			return (<div></div>);
		} 
	}
	 
	render() {   
		return (
			<article>
				<h1>{this.props.chaptername}</h1>
				<div dangerouslySetInnerHTML={{__html: this.props.detail}}>
				</div>	
				{this.showBtn()}
			</article>
		);

	}
}