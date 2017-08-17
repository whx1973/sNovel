import React from 'react';  
import { Link } from 'react-router'; 

import BookItem from '../BookItem';

import SubHeader from '../../layouts/SubHeader'; 

export default class ListComponent extends React.Component {
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

