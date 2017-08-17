import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { hashHistory, Link } from 'react-router'; 
import * as actions  from './ChapterDetailRedux';
import * as chapterDetailActions from './ChapterDetailRedux'; 
import ChapterArticle from '../components/BookChapter/ChapterArticle'; 
import GetData from '../components/GetData';  
import SubHeader from '../layouts/SubHeader';
import styles from '../layouts/base.css' 

export class ChapterDetailComponent extends Component { 
	constructor(props) {
	  super(props);
	  this.getPrevPage = this.getPrevPage.bind(this);  
	  this.getNextPage = this.getNextPage.bind(this);
	}
	getPrevPage(){ 
		const bookId = this.props.params.bid; 
		const {prevChapter,nextChapter} = this.props.chapterDetail.data;
		if(prevChapter){
			this.props.getChapterDetail(bookId,prevChapter);
			hashHistory.push(`/chapter/${bookId}/${prevChapter}`);
		} 
	}
	getNextPage(){  
		const bookId = this.props.params.bid;
		const {prevChapter,nextChapter} = this.props.chapterDetail.data;
	 
		if (nextChapter) {
			this.props.getChapterDetail(bookId,nextChapter);
			hashHistory.push(`/chapter/${bookId}/${nextChapter}`);
		}
		
	}
	componentDidMount() {   
		this.props.getChapterDetail(this.props.params.bid,this.props.params.cid); 
	} 
	componentDidUpdate(){
		const { cid } = this.props.params;
		if(this.props.chapterDetail.loaded){
			if(cid != this.props.chapterDetail.data.currentChapterId){
				this.props.getChapterDetail(this.props.params.bid,this.props.params.cid);
			} 
		}  
		this.props.registerEvent();
	}
	 
	render() {  
		const { isFetching, loaded } = this.props.chapterDetail; 
		if(loaded){
			return (
				<div>
					<SubHeader title ={this.props.chapterDetail.data.bookName}>
						<Link className={styles.a_reset} to={"/"}>首页</Link>
					</SubHeader>
					<ChapterArticle {...this.props.chapterDetail.data} />
				</div>
			) 
		}else{
			return null
		}  
	}
}

 
const mapStateToProps = (state) => {  
	const { chapterDetail } = state;
	 
	return { 
		chapterDetail 
	}
}     
const mapDispatchToProps = (dispatch,ownProps) => ({  
	 getChapterDetail: (bookId, chapterId) => {
	 	dispatch(chapterDetailActions.actions.getChapterDetail(bookId, chapterId))
	 }
})

const ChapterDetail = connect(mapStateToProps,mapDispatchToProps)(GetData(ChapterDetailComponent,'chapterDetail'))

export default ChapterDetail;