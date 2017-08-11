import React from 'react'
import searchImg  from '../images/logo.gif.png'
require('./search.css')
const Header = () => (
	<header className="header">
		<section>
			<img src={searchImg} alt=""  />
			<div className = {'search'}>
				<a>搜索</a>
			</div>
		</section>
	</header> 
)
export default Header