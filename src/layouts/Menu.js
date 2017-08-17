import React from 'react';
import { Link } from 'react-router';
//require('./nav.css');
import styles from './menu.css';

let Menu = () => (
    <div className={styles.bar}>
        <div className={styles.item}>
            <Link className={styles.item_a} to={`/category`}>分类</Link>
        </div>
        <div className={styles.item}><a className={styles.item_a}>排行</a></div>
        <div className={styles.item}><a className={styles.item_a}>完本</a></div>
        <div className={styles.item}><a className={styles.item_a}>推荐</a></div>
        <div className={styles.item}><a className={styles.item_a}>书架</a></div>
    </div>
)
export default Menu;
