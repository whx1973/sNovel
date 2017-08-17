import React, { Component } from 'react';
import { Link } from 'react-router' 

//require('./category.css') 
import Menu from '../../Layouts/Menu';

import styles from './category.css';

const ChildCategory = (props) => { 
	return (<Link className={styles.btn_line_gray} to={`/list/${props.cid}/1`}>{props.name}</Link>); 
}

class PCategory extends Component {
	renderChild(){  
		var childs = [];
		var data = this.props.data.filter((item)=>{return item.pid==this.props.cid}) 
		data.forEach((item,i)=>{ 
			childs.push(<ChildCategory key={i} {...item} />)
			childs.push(' ') 
 		})
 		 
 		return childs
	}
	render (){ 
		return (
			<li>
				<Link className={styles.sort_li_header} to={`/list/${this.props.cid}/1`}>
					<h3 className={styles.module_title}>
						{this.props.name}
						{/*<span className={styles.sort_li_data}>共<output>584400</output>本作品</span>*/}
						<i className = {styles.sort_li_header_i}></i>
					 </h3>
				</Link>
				<div className={styles.sort_li_detail}>
					{
						this.renderChild() 
					}
				</div>
			</li>
		);
	}
}

export default class Category extends Component {
	constructor(props) {
		super(props);
		
	}
	componentDidMount() {
		this.props.getCategoryList(); 
	}
	render(){ 
		const { loaded } = this.props.categoryList;
		if(loaded){
			const {data} = this.props.categoryList;  
			return (
				<div>
					<Menu />
				 	<div className={styles.module_merge}>
				 		<ul className={styles.sort_ul}>
				 			{
				 				data.filter((item)=>{
				 					return item.pid==0
				 				}).map((item,i)=>{
				 					return (<PCategory key={i} {...item} data={data} />)
				 				})
				 			}
				 		</ul>
				 	</div>
	    		</div>
			)
		}else{
			return null
		}
		
	}
}