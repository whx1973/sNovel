import React, { Component, propTypes } from 'react';
import { Link } from 'react-router';

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
    	const {chapterListData} = this.props.chapterList; 
    	if(chapterListData&&chapterListData.data) {  
    		const list = chapterListData.data;
			return list.map((item,key)=>{
				if(item.chaptertype===1){
					return (<li className="grade_01" key={key}>{item.chaptername}</li>)
				}else{
					return (<li className="grade_02" key={key}><Link to={`/chapter/${this.props.bookId}/${item.chapterid}`}>{item.chaptername}</Link></li>)
				}
			})
		} else {
			return <div></div>
		} 
		//console.log(list) 
    }
	render(){
		const className = this.state.sort===0?'sort':'sort reverse';
		const {chapterListData} = this.props.chapterList;
		 
		return (
			<section className="book-directory">
				<h4 className="book-title">
					目录<span>(共{this.props.chapters}章)</span>
					<a className={className} onClick = {this.handlerClick} >{this.state.sortName}<i></i></a>
				</h4>
				<div className="catalist">
					<ul> 
						{this.renderList()}
					 </ul>
					 <Link to={`/catalog/${this.props.bookId}`} className="more">
					 	<span>更多目录</span>
					 	<i></i>
					 </Link>
				</div>
			</section>
		);
	}
}

