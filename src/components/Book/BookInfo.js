import React, { Component } from 'react'; 
import { Link } from 'react-router';
import getSortName from '../../utils/SortName';
require('./BookDetail.css');

export default class BookInfo extends Component {
	render() {
		const {articlename, author, imgUrl, chapters, fullflag, sortid} = this.props;
		return (
				<section className="main flex_box">
					<div>
						<img src={"../"+imgUrl}  />
						<h3>{articlename}</h3>
						<p>作者：{author}</p> 
						<p>分类：{getSortName(sortid)}</p> 
						<p>章节数：{chapters}</p>
						<p>{fullflag==0?'连载中':'已完结'}</p>
					</div>
					<div className="btns">
						<Link className="flex_box btn">
							<input type="button" value="立即阅读"  /> 
						</Link>
						<Link className="flex_box btn">
							<input type="button" value="放入书架"  />
						</Link>
					</div>
				</section>
		)
	}
}