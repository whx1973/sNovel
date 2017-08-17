import React,{ Component } from 'react';
import { Link } from 'react-router';  
import searchImg  from '../images/search_1.png';
import styles from './subHeader.css';

export default class SubHeader extends Component {
	constructor(props) {
		super(props); 
		this.goBack = this.goBack.bind(this);
	}
	goBack(){
		window.history.back()
	}
	render(){
		return (
			<div className={styles.subheader}>
				<div className={styles.back} onClick={this.goBack}></div>
				<h1 className={styles.subheader_h1}>{this.props.title}</h1>
				<div className={styles.subsearch}>
					{/*<div className={styles.ui_search}>
						<img className={styles.ui_search_img} src={searchImg}/>
					</div>*/}
					<div className ={styles.subheader_operate}>
						{this.props.children}
					</div>
				</div>
			</div>
		)
	}
	
} 