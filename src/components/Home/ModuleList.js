import React from 'react';  
import { Link } from 'react-router';
import ModuleItem from './ModuleItem';
require('./module.css');

export default class Module extends React.Component {
    constructor(props) {
       super(props);   
    }  
	componentDidMount() {  
		this.props.getData() 
	} 
    render() {   
    	const {moduleName,moduleNameCode,moduleDesc} = this.props
    	 
    	if(this.props[moduleNameCode+'data']&&this.props[moduleNameCode+'data']['loaded']){
    		let {data}  = this.props[moduleNameCode+'data']
			return (
				<div className="module">
	              	<div className="module-header">
						<div className="module-header-l">
							<h3 className="module-title">{moduleName} </h3>
							<span className="module-title-desc">{moduleDesc}</span>
						</div>
						<div className="module-header-r">
							<a href="" className="module-header-btn">更多</a>
						</div>
					</div>
					<ol className="book-ol book-ol-normal">

						 {data.map((ele,index)=>{
						 	return <ModuleItem key={index} item = {ele}/>
						 })}
					</ol>
				</div>
	        )
 		}else{
 			return (<div></div>)
 		}
    }
}

