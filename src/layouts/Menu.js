import React from 'react';
import { Link } from 'react-router';
require('./nav.css');

let Menu = () => (
	<div className="bar flex_box">
		<div className="item flex_box"><Link to={`/category`}>分类</Link></div>
		<div className="item flex_box"><a >排行</a></div>
		<div className="item flex_box"><a >完本</a></div>
		<div className="item flex_box"><a >推荐</a></div>
		<div className="item flex_box"><a >书架</a></div> 
	</div> 
)
export default Menu;
