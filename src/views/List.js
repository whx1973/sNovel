import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import * as actions from './ListRedux';
import { hashHistory,Link } from 'react-router'; 
import GetData from '../components/GetData';
import ListComponent from '../components/List/ListComponent'; 
import SubHeader from '../layouts/SubHeader';
import styles from '../layouts/base.css' 
class ListCon extends Component {
	constructor(props) {
		super(props); 
		this.getPrevPage = this.getPrevPage.bind(this);
		this.getNextPage = this.getNextPage.bind(this);  
	}
	componentDidMount() {   
		let { cid, pageId} = this.props.params;  
		const pageSize = 10; 
		pageId = pageId || 1;
		this.props.getList(cid, pageId, pageSize); 
	}  
	getPrevPage(){
		let { cid, pageId} = this.props.params;  
		const pageSize = 10; 
		if(+pageId > 1) {
			pageId = pageId - 1;
			this.props.getList(cid, pageId, pageSize);
	        hashHistory.push(`/list/${cid}/${pageId}`);
		}
		
	} 
    getNextPage(){  
		let { cid, pageId} = this.props.params;  
		const pageSize = 10; 
		pageId = pageId || 1;
		pageId = +pageId + 1;
		this.props.getList(cid, pageId, pageSize);
        hashHistory.push(`/list/${cid}/${pageId}`);
    } 
	componentDidUpdate(){   
		let { cid, pageId} = this.props.params;  
		const pageSize = 10;  
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
			return (
				<div>
					<SubHeader title = {this.props.list.categoryName} >
						<Link className={styles.a_reset} to={"/"}>首页</Link>
					</SubHeader>
					<ListComponent ref={(control) => {this.listDom = control;}} data={this.props.list.data}/>
					
				</div>)
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