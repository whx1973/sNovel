import React from 'react';  
import { Link } from 'react-router';
import getSortName from '../utils/SortName';
import styles from './bookItem.css'

const BookItem = (props) => {
		const {articlename, author, imgUrl, intro, articleid, sortid, fullflag} = props.item
		return ( 
				<li className={styles.book_li}>
					<Link to={"/book/"+articleid} className={styles.book_layout}> 
						<img src={"../"+imgUrl} className={styles.book_cover} alt={articlename} />
						<div className={styles.book_cell}>
							<h4 className={styles.book_title}>{articlename}</h4>
							<p className={styles.book_desc}>{intro}</p>
							<div className={styles.book_meta}>
								<div className={styles.book_meta_l}>
									<span className={styles.book_author}>
										<aria>作者：</aria>{author}
									</span>
								</div>
								<div className={styles.book_meta_r}>
									<span>
										<em>{getSortName(sortid)}</em>
										{' '}
										<em>{fullflag==0?'连载中':'已完结'}</em> 
									</span>
								</div>
							</div>
						</div> 
					</Link>
				</li>
		) 
} 
export default BookItem;