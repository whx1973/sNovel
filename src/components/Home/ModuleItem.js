import React from 'react';  
import { Link } from 'react-router';
import getSortName from '../../utils/SortName';

export default class ModuleItem extends React.Component {
	render() {
		const {articlename, author, imgUrl, intro, articleid, sortid, fullflag} = this.props.item
		return (
				 
				<li className="book-li">
					<Link to={"/book/"+articleid} className="book-layout"> 
						<img src={"../"+imgUrl} className="book-cover" alt={articlename} />
						<div className="book-cell">
							<h4 className="book-title">{articlename}</h4>
							<p className="book-desc">{intro}</p>
							<div className="book-meta">
								<div className="book-meta-l">
									<span className="book-author" role="option">
										<aria>作者：</aria>{author}
									</span>
								</div>
								<div className="book-meta-r">
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
}