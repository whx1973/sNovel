import React, { Component } from 'react';
import { connect } from 'react-redux'; 
import { hashHistory,Link } from 'react-router'; 
import * as actions  from './BookRedux';
import * as chapterActions from './ChapterListRedux';
import BookInfo from '../components/Book/BookInfo';
import BookRecent from '../components/Book/BookRecent';
import BookDetailInfo from '../components/Book/BookDetailInfo';
import BookDirectory from '../components/Book/BookDirectory'; 
import SubHeader from '../layouts/SubHeader';
import Footer from '../layouts/Footer';
import styles from '../layouts/base.css' 

export class BooKDetailComponent extends Component { 
	constructor(props) {
	  super(props);  
	  this.onBack = this.onBack.bind(this);
	}
	componentDidMount() { 
		this.props.getData();  
	}
	onBack(){
		window.history.back();
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
					<SubHeader title ='书籍详情' onBack = {this.onBack}> 
						<Link className={styles.a_reset} to={"/"}>首页</Link>
					</SubHeader>
					<BookInfo {...this.props.bookDetail} bookId = {bookId}/>
					{bookRecent}
					<BookDetailInfo {...this.props.bookDetail} bookId = {bookId}/>
					<BookDirectory {...this.props.bookDetail}  bookId = {bookId} getChapterList = {this.props.getChapterList} chapterList = {chapterList}  />
					<Footer />
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