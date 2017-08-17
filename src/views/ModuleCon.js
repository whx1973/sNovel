import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModuleList from '../components/Home/ModuleList';
import Menu from '../layouts/Menu';   
import * as actions  from './HomeRedux'
 
const mapStateToProps = (state,ownProps) => {  
	const { bookModule } = state   
	return { 
		moduleName: ownProps.moduleName,
		moduleNameCode: ownProps.moduleNameCode,
		[ownProps.moduleNameCode+'data']:bookModule[ownProps.moduleNameCode],
		moduleDesc: ownProps.moduleDesc 
	}
}    
const mapDispatchToProps = (dispatch,ownProps) => ({ 
	
	getData: () =>{  
		dispatch(actions.actions.getBookModule(ownProps.moduleNameCode)) 
	}
})

const ModuleCon = connect(mapStateToProps,mapDispatchToProps)(ModuleList)

export default ModuleCon