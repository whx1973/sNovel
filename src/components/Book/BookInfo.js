import React, { Component } from 'react'; 
import { Link } from 'react-router';
import getSortName from '../../utils/SortName'; 
import styles from './BookDetail.css'; 

export default class BookInfo extends Component {
	render() { 
		const {articlename, author, imgUrl, chapters, fullflag, sortid} = this.props; 
		return (
				<section className={styles.main}>
					<div className={styles.main_div}>
						<img className= {styles.main_img} src={"../"+imgUrl}  />
						<h3 className = {styles.main_h3}>{articlename}</h3>
						<p className = {styles.main_p}>作者：{author}</p> 
						<p className = {styles.main_p}>分类：{getSortName(sortid)}</p> 
						<p className = {styles.main_p}>章节数：{chapters}</p>
						<p className = {styles.main_p}>{fullflag==0?'连载中':'已完结'}</p>
					</div>
					<div className={styles.btns}>
						<Link className={styles.btn_red}>
							立即阅读
						</Link>
						<Link className={styles.btn_white}>
							放入书架
						</Link>
					</div>
				</section>
		)
	}
}