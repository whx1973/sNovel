import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions  from './ChapterDetailRedux';
import * as chapterDetailActions from './ChapterDetailRedux';

import ChapterArticle from '../components/BookChapter/ChapterArticle';

export class ChapterDetailComponent extends Component { 
	constructor(props) {
	  super(props);  
	  
	}
	componentDidMount() {  
	 
		this.props.getChapterDetail(this.props.params.bid,this.props.params.cid);
	}
	shouldComponentUpdate(nextProps, nextState) { 
		return true;
	}
	componentDidUpdate(){
		const { cid } = this.props.params;
		if(this.props.chapterDetail.chapterDetailData.loaded){
			if(cid != this.props.chapterDetail.chapterDetailData.data.currentChapterId){
				this.props.getChapterDetail(this.props.params.bid,this.props.params.cid);
			} 
		} 
	}
	 
	render() { 
		const {isFetching, loaded } = this.props.chapterDetail.chapterDetailData;
		const detail = this.props.chapterDetail; 
		if(isFetching&&!loaded){
			return (
				<div>
					loading...
				</div>
			)
		}else if(!isFetching&&loaded) {
			return (
				<ChapterArticle {...this.props.chapterDetail.chapterDetailData.data} getPrevOrNext = {this.props.getChapterDetail }/>
			);
		}else{
			return (<div>error</div>);
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

const ChapterDetail = connect(mapStateToProps,mapDispatchToProps)(ChapterDetailComponent)

export default ChapterDetail;