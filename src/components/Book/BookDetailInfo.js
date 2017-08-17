import React, { Component } from 'react';
import styles from './BookDetail.css';

export default class BookDetailInfo extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {showmore:false};
	  this.handlerShowMore = this.handlerShowMore.bind(this)
	}
	handlerShowMore(){ 
	  this.setState({
	  	showmore:!this.state.showmore
	  })
	}
	getDetailInfo(){
		if(this.state.showmore){
			return (
				<div className={styles.book_detail_content} style={{display:'block'}} dangerouslySetInnerHTML={{__html: this.props.intro}}> 
				</div>
			);
		}else{
			return (
				<div>
					<div className={styles.book_detail_content} dangerouslySetInnerHTML={{__html: this.props.intro}}> 
					</div>
					<p className={styles.book_detail_showmore} onClick={this.handlerShowMore} >
						展开<i className={styles.book_detail_showmore_i}></i>
					</p>
				</div>
			);
		}
	}
	render() { 
		return (
			<section className={styles.book_detail}>
				<h4 className={styles.book_title}>内容简介</h4>
				{this.getDetailInfo()}
			</section>
		);
	}
}