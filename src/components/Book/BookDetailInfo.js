import React, { Component } from 'react';

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
				<div className="content" style={{display:'block'}} dangerouslySetInnerHTML={{__html: this.props.intro}}> 
				</div>
			);
		}else{
			return (
				<div>
					<div className="content" dangerouslySetInnerHTML={{__html: this.props.intro}}> 
					</div>
					<p className="showmore" onClick={this.handlerShowMore} >
						展开<i></i>
					</p>
				</div>
			);
		}
	}
	render() { 
		return (
			<section className="book-detail">
				<h4 className="book-title">内容简介</h4>
				{this.getDetailInfo()}
			</section>
		);
	}
}