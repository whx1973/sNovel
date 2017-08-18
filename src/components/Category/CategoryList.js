import React, { Component } from 'react';
import { Link } from 'react-router'  
import Menu from '../../Layouts/Menu'; 
import styles from './category.css';
import SubHeader from '../../layouts/SubHeader';
import Footer from '../../layouts/Footer';    

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
 		 
 		return childs;
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
		this.onBack = this.onBack.bind(this);
	}
	onBack(){
		window.history.back();
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
					<SubHeader title ='分类' onBack = {this.onBack}>
						<Link className={styles.link} to={"/"}>首页</Link>
					</SubHeader>
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
				 	<Footer />
	    		</div>
			)
		}else{
			return null
		}
		
	}
}