import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions  from './BookRedux';
import * as chapterActions from './ChapterListRedux';
import BookInfo from '../components/Book/BookInfo';
import BookRecent from '../components/Book/BookRecent';
import BookDetailInfo from '../components/Book/BookDetailInfo';
import BookDirectory from '../components/Book/BookDirectory';

export class BooKDetailComponent extends Component { 
	constructor(props) {
	  super(props);  
	  
	}
	componentDidMount() { 
		this.props.getData();  
	}
	 
	render() { 
		const {isFetching, loaded, chapterList } = this.props;
		const bookId = this.props.params.id; 
	 
		if(isFetching&&!loaded){
			return (
				<div>
					loading...
				</div>
			)
		} 
		if(!isFetching&&loaded){ 
			let bookRecent = null; 
			if(this.props.bookDetail.fullflag===0){
				bookRecent = <BookRecent {...this.props.bookDetail} bookId = {bookId}/>
			}
			return (
				<div>
					<BookInfo {...this.props.bookDetail} bookId = {bookId}/>
					{bookRecent}
					<BookDetailInfo {...this.props.bookDetail} bookId = {bookId}/>
					<BookDirectory {...this.props.bookDetail}  bookId = {bookId} getChapterList = {this.props.getChapterList} chapterList = {chapterList}  />
				</div>
			);
		}else{
			return (
				<div>
					error
				</div>
			);
		}
		 
		
	}
}

 
const mapStateToProps = (state) => {  
	const { bookDetail, chapterList } = state;   
	return { 
		didInvalidate:bookDetail.didInvalidate,
 		isFetching:bookDetail.isFetching,
 		loaded:bookDetail.loaded,
 		bookDetail:bookDetail.data,
 		chapterList
	}
}     
const mapDispatchToProps = (dispatch,ownProps) => ({  
	getData: () =>{   
		dispatch(actions.actions.getBookDetail(ownProps.params.id)) 
	},
	getChapterList: (bookId, pageId, pageSize, order) => { 
		dispatch(chapterActions.actions.getChapterList(bookId, pageId, pageSize, order))
	}
})

const BookDetail = connect(mapStateToProps,mapDispatchToProps)(BooKDetailComponent)

export default BookDetail;