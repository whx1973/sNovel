import React, { Component, propTypes } from 'react';
import { Link } from 'react-router';
import styles from './BookDetail.css';

export default class BookDirectory extends Component {
	static defaultProps = {
		pageId:1,
		pageSize:10,
		sort:0
	}
	constructor(props) {
	  	super(props);    
	  	this.handlerClick = this.handlerClick.bind(this); 
	  	this.state = {
	  		sort:this.props.sort,
	  		sortName:'倒序'
	  	} 
	} 
	componentDidMount() {
		const {pageId, pageSize, sort} = this.props;
		this.props.getChapterList(this.props.bookId, pageId, pageSize, sort);
	}
	handlerClick(e){   
		this.state = {
	  		sort:this.state.sort==0?1:0,
	  		sortName:this.state.sort==0?'正序':'倒序'
	  	}  
	  	const {pageId, pageSize, sort} = this.props;
		this.props.getChapterList(this.props.bookId, pageId, pageSize, this.state.sort); 
	}
    renderList() { 
    	 
    	if(this.props.chapterList&&this.props.chapterList.data) {  
    		const list = this.props.chapterList.data;
			return list.map((item,key)=>{
				if(item.chaptertype===1){
					return (<li className={styles.book_directory_grade_01} key={key}>{item.chaptername}</li>)
				}else{
					return (<li className={styles.book_directory_grade_02} key={key}><Link className = {styles.link} to={`/chapter/${this.props.bookId}/${item.chapterid}`}>{item.chaptername}</Link></li>)
				}
			})
		} else {
			return <div></div>
		} 
		//console.log(list) 
    }
	render(){ 
		return (
			<section className={styles.book_directory}>
				<h4 className={styles.book_title}>
					目录<span className={styles.book_title_span}>(共{this.props.chapters}章)</span>
					<a className={styles.book_title_sort} onClick = {this.handlerClick} >{this.state.sortName}
						<i className={this.state.sort===1?styles.book_title_sort_i:styles.book_title_sort_reverse_i}></i>
					</a>
				</h4>
				<div className={styles.book_directory_catalist}>
					<ul> 
						{this.renderList()}
					 </ul>
					 <Link to={`/catalog/${this.props.bookId}`} className= {styles.book_directory_more}>
					 	<span className = {styles.book_directory_more_span}>更多目录</span>
					 	<i className = {styles.book_directory_more_i}></i>
					 </Link>
				</div>
			</section>
		);
	}
}

