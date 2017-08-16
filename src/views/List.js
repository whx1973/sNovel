import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import * as actions from './ListRedux';
import { hashHistory } from 'react-router';

import GetData from './GetData';
import ListComponent from '../components/List/ListComponent';

 
class ListCon extends Component {
	constructor(props) {
		super(props); 
		this.getNextPage = this.getNextPage.bind(this); 
	}
	componentDidMount() {   
		let { cid, pageId} = this.props.params;  
		const pageSize = 6; 
		pageId = pageId || 1;
		this.props.getList(cid, pageId, pageSize); 
	}
 	 
	 
    getNextPage(){  
		let { cid, pageId} = this.props.params;  
		const pageSize = 6; 
		pageId = pageId || 1;
		pageId = +pageId + 1;
		this.props.getList(cid, pageId, pageSize);
        hashHistory.push(`/list/${cid}/${pageId}`);
    } 
	componentDidUpdate(){   
		let { cid, pageId} = this.props.params;  
		const pageSize = 6;  
		if(this.props.list.loaded){
			if(pageId != this.props.list.pageId){
				this.props.getList(cid, pageId, pageSize);
			}
			
		}  
		this.props.registerEvent();
	}
	 

	render(){
		const {loaded} = this.props.list;
		if(loaded){
			return <ListComponent ref={(control) => {this.listDom = control;}} data={this.props.list.data}/>
		}else{
			return null;
		}
	}
}

const mapStateToProps = (state) => {     
	const { list } = state;  
	return { 
		list	 
	}
}     
const mapDispatchToProps = (dispatch,ownProps) => ({   
	getList: (cid, pageIndex, pageSize) => { 
		dispatch(actions.actions.getList(cid, pageIndex, pageSize))
	}
})

const List = connect(mapStateToProps,mapDispatchToProps)(GetData(ListCon,'list'))

export default List;