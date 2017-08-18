import React from 'react';
import { Link } from 'react-router';
import styles from './siderbar.css';

export default class SiderBar extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const isShow = this.props.isShow; 
		const className = isShow?styles.read_opt_more_active:styles.read_opt_more_unactive; 
		const bookId = this.props.bookId; 
		return (
			<div className = {className}>
				<ul>
					<li className = {styles.read_opt_more_li}>
						<span>加入书签</span>
					</li>
					<li className = {styles.read_opt_more_li}>
						<span>返回我的书架</span>
					</li>
					<li className = {styles.read_opt_more_li}>
						<Link className={styles.read_opt_more_a} to={`/book/${bookId}`}><span>书籍详情</span></Link> 
					</li>
					<li className = {styles.read_opt_more_li}>
						<Link className={styles.read_opt_more_a} to={'/'}><span>返回首页</span></Link>
					</li>
				</ul>
			</div>
		);
	}	
}