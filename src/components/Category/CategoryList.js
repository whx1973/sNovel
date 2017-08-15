import React, { Component } from 'react';
import { Link } from 'react-router' 

require('./category.css') 
import Menu from '../../Layouts/Menu';

class ChildCategory extends Component {
	render(){
		return (<Link className="btn-line-gray" to={`/list/${this.props.cid}`}>{this.props.name}</Link>);
	}
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
			<li className="sort-li">
				<Link className="sort-li-header" to={`/list/${this.props.cid}`}>
					<h3 className="module-title">
						{this.props.name}
						{/*<span className="sort-li-data">共<output>584400</output>本作品</span>*/}
						<i></i>
					 </h3>
				</Link>
				<div className="sort-li-detail">
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
				 	<div className="module module-merge">
				 		<ul className="sort-ul">
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
			return <div>loading</div>
		}
		
	}
}