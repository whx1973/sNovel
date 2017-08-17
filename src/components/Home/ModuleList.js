import React from 'react';  
import { Link } from 'react-router';
import BookItem from '../BookItem'; 
import styles from './module.css';

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
				<div className={styles.module}>
	              	<div className={styles.module_header}>
						<div className={styles.module_header_l}>
							<h3 className={styles.module_title}>{moduleName} </h3>
							<span className={styles.module_title_desc}>{moduleDesc}</span>
						</div>
						<div className={styles.module_header_r}>
							<a href="" className={styles.module_header_btn}>更多</a>
						</div>
					</div>
					<ol className={styles.book_ol_normal}>

						 {data.map((ele,index)=>{
						 	return <BookItem key={index} item = {ele}/>
						 })}
					</ol>
				</div>
	        )
 		}else{
 			return (<div></div>)
 		}
    }
}

