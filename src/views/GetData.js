import React, { Component } from 'react';

GetData.defaultProps  = {
	monitorEvent:[ 'click', 'touchstart', 'touchend','mousewheel', 'scroll'],
	top:0,
	left:0,
	right:0,
	bottom:0,

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
			this.clear = this.clear.bind(this); 
		} 
		componentDidMount() {   
			let eventList = GetData.defaultProps.monitorEvent;  
			var fn = this.getDataLoad(this.wappedComponent);
			for(let i = 0; i < eventList.length; i++){
				window.addEventListener(eventList[i], fn, false);
			} 
			this.props.router.setRouteLeaveHook(
		        this.props.route, 
		        this.routerLeave.bind(this)(fn), 
		    )
		} 
		routerLeave(fn) {  
			var self = this; 
			return function(){  
	    		self.clear(fn); 
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
			console.log(WrappedComponent.getNextPage); 
			return function(){  
				var result = self.testMeet();  
				if (result=='top'&&WrappedComponent.getPrevPage) { 
					//WrappedComponent.getPrevPage();
				}else if(result == 'bottom'&&WrappedComponent.getNextPage){  
					WrappedComponent.getNextPage();
				} 
				self.clear();
				 
			}
			
		}  
		clear(fn){
			let eventList = GetData.defaultProps.monitorEvent; 
			for(let i = 0; i < eventList.length; i++){ 
				window.removeEventListener(eventList[i], fn, false);
			} 
		}
		 
		render () { 

			const newProps =Object.assign({},this.props );
			 
			const {loaded, isFetching, didInvalidate} = this.props[dataSourceKey];   
			return (   
				<div id='container' ref = {(control) =>{this.container = control;}}>
					<div className={"data-load-"+!loaded}> 
					</div>
					<WrappedComponent ref = {(c) => {this.wappedComponent = c;}}  {...newProps}  />
				</div>
			);
		}
	}
} 