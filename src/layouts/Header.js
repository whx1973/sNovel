import React from 'react';
import searchImg  from '../images/logo.gif.png';
import styles from './header.css';
const Header = () => (
	<header className={styles.header}>
		<section>
			<img className = {styles.header_img} src={searchImg} alt=""  />
			<div className = {styles.search}>
				<a className = {styles.search_a}>搜索</a>
			</div>
		</section>
	</header> 
)
export default Header