import React, { Component } from 'react';
import styles from '../layouts/base.css'

GetData.defaultProps  = {
	monitorEvent:[ 'click', 'touchstart', 'touchend','mousewheel', 'scroll']

}
export default function GetData(WrappedComponent,dataSourceKey) {
	return class EnhancedComponent extends Component {
		constructor(props) {
			super(props);  
			this.getDataLoad = this.getDataLoad.bind(this);
			this.testMeet = this.testMeet.bind(this);
			this.getScrollTop = this.getScrollTop.bind(this)
			this.getClientHeight = this.getClientHeight.bind(this)
			this.getScrollHeight = this.getScrollHeight.bind(this); 
			this.clearEvent = this.clearEvent.bind(this); 
			this.registerEvent = this.registerEvent.bind(this);
			this.state = {};
		} 
		registerEvent () { 
			let eventList = GetData.defaultProps.monitorEvent;   
			for(let i = 0; i < eventList.length; i++){
				window.addEventListener(eventList[i], this.state.eventFun, false);
			}    
		}
		//绑定监听事件(touchstart touchend)
		componentDidMount() {   
			let eventList = GetData.defaultProps.monitorEvent;  
			var fn = this.getDataLoad(this.wappedComponent);
			this.setState({eventFun: fn});
			for(let i = 0; i < eventList.length; i++){
				window.addEventListener(eventList[i], fn, false);
			} 
			this.registerEvent(fn);
			this.props.router.setRouteLeaveHook(
		        this.props.route, 
		        this.routerLeave.bind(this)(fn), 
		    )
		} 
		routerLeave(fn) {  
			var self = this; 
			return function(){   
	    		self.clearEvent(fn); 
			} 
	    }
		//获取滚动条当前的位置 
		getScrollTop(){
			var scrollTop = 0; 
		    if (document.documentElement && document.documentElement.scrollTop) { 
		    	scrollTop = document.documentElement.scrollTop; 
		    } 
		    else if (document.body) { 
		    	scrollTop = document.body.scrollTop; 
		    } 
		    return scrollTop; 
		}
		//获取当前可视范围的高度 
    	getClientHeight() { 
		    var clientHeight = 0; 
		    if (document.body.clientHeight && document.documentElement.clientHeight) { 
		    	clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight); 
		    } 
		    else { 
		    	clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight); 
		    } 
		    return clientHeight; 
		} 
		//获取文档完整的高度
		getScrollHeight() {  
		    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight); 
		} 
		testMeet(){  
			if(this.getScrollTop()==0){
				 return 'top'
			}
			if(this.getScrollTop()+this.getClientHeight()==this.getScrollHeight())
			{
				 return 'bottom';
			} 
		}  
		 
		getDataLoad(WrappedComponent){
			var self = this;    
			return function(){  
				var result = self.testMeet();  
				if (result=='top'&&WrappedComponent.getPrevPage) { 
					console.log('a')
					//WrappedComponent.getPrevPage();
				}else if(result == 'bottom'&&WrappedComponent.getNextPage){  
					WrappedComponent.getNextPage();
				} 
				self.clearEvent();
				 
			}
			
		}  
		clearEvent(fn){
			let eventList = GetData.defaultProps.monitorEvent; 
			for(let i = 0; i < eventList.length; i++){ 
				window.removeEventListener(eventList[i], fn, false);
			} 
		}
		 
		render () {  
			const newProps =Object.assign({},this.props); 
			const {loaded, isFetching, didInvalidate} = this.props[dataSourceKey];   
			return (   
				<div id='container' ref = {(control) =>{this.container = control;}}> 
					<div className={"data_load_"+!loaded}></div> 
					<WrappedComponent ref = {(c) => {this.wappedComponent = c;}}  {...newProps} registerEvent = {this.registerEvent}  />
					
				</div>
			);
		}
	}
} 