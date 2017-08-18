import React from 'react';
import SiderBar from './SiderBar';
import SubHeader from '../../layouts/SubHeader'; 
import styles from './chapterheader.css';

export default class ChpaterHeader extends React.Component {
	constructor(props) {
		super(props); 
		this.handlerClick = this.handlerClick.bind(this);
		this.state = {showMoreOpt:false}
	}
	handlerClick(event){  
		this.setState({showMoreOpt:!this.state.showMoreOpt}); 
	}
	componentWillReceiveProps(nextProps) {
		const {optShow} = nextProps;
		if(!optShow) this.setState({showMoreOpt:false}); 
	}
	render(){ 
		const optShow = this.props.optShow;
		if(optShow){
			return ( 
				<div className = {styles.topfixed}>
					<SubHeader title ={this.props.title} onBack = {this.props.onBack}>
						<span className={styles.link} onClick = {this.handlerClick}>更多</span> 
					</SubHeader>
					<SiderBar isShow = {this.state.showMoreOpt} bookId = {this.props.bookId}/>
				</div>
			)
		} else {
			return null;
		}

	}
}