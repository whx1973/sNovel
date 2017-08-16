import React from 'react';  
import { Link } from 'react-router'; 

import BookItem from '../BookItem'
require('./list.css');

export default class Module extends React.Component {
    constructor(props) {
       super(props);   
    }  
	componentDidMount() {   
	} 
    render() {   
    		const data = this.props.data; 
			return (
				<ol className="book-ol book-ol-normal">
					{data.map((ele,index)=>{
						 	return <BookItem key={index} item = {ele}/>
					})} 
				</ol>
	        )
 		 
    }
}

