import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import * as actions  from './CategoryRedux';
import CategoryList from '../Components/Category/CategoryList';

 
const mapStateToProps = (state) => {   
	const {categoryList} = state; 
	return {
		categoryList
	} 
}     
const mapDispatchToProps = (dispatch,ownProps) => ({  
	 
	getCategoryList: () => { 
		dispatch(actions.actions.getCategoryList())
	}
})

const Category = connect(mapStateToProps,mapDispatchToProps)(CategoryList)

export default Category;