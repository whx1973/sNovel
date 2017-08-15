!(function(myScroll){ 
	if( typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		define(myScroll);
	}else if (typeof module !== 'undefined' && module.exports) {
		module.exports = myScroll();
	}else {
		window.myScroll = myScroll();
	}
})(function () {  
	function myScroll(select, set) {  
		this.el = getEl(select); //选择元素触发加载滚动的元素  
		if(!set){
			set = {};
		} 
		/*
            元素在可视区位置，符合其中一个条件就会触发加载机制
        */
        this.top = set.top || 0;
        this.right = set.right || 0;
        this.bottom = set.bottom || 0;
        this.left = set.left || 0;

        //status
        this.status = '';

        /*
            回调方法
        */
        this.startCall = set.start || function() {}; //开始加载时调用方法
        this.loadCall = set.load || function() {}; //加载成功时调用方法
        this.errorCall = set.error || function() {}; //加载失败调用方法
        this.endCall = set.end || function() {}; //加载完成时调用方法
 		//监听的事件列表
        //this.monitorEvent = ['DOMContentLoaded', 'load', 'click', 'touchstart', 'touchend', 'haschange', 'online', 'pageshow', 'popstate', 'resize', 'storage', 'mousewheel', 'myScroll'];
        this.monitorEvent = [ 'click', 'touchstart', 'touchend','mousewheel', 'scroll'];
        
        this.init();
	}



	myScroll.prototype.setStatus = function(status){
		this.status = status;
		this.eachDOM();
	}

	myScroll.prototype.init = function(){ 
		this.eachDOM = this.eachDOM.bind(this);
		var eventList = this.monitorEvent;
        for (var i = 0; i < eventList.length; i++) {
            window.addEventListener(eventList[i], this.eachDOM, false);
        } 
	}

	 /**
     * 检测元素是否在可视区
     * @param {object} el 检测的元素
     */
    myScroll.prototype.testMeet = function(el) {  
        var bcr = el.getBoundingClientRect(); //取得元素在可视区的位置

        var mw = el.offsetWidth; //元素自身宽度
        var mh = el.offsetHeight; //元素自身的高度
        var w = window.innerWidth; //视窗的宽度
        var h = window.innerHeight; //视窗的高度
        var boolX = (!((bcr.right - this.left) <= 0 && ((bcr.left + mw) - this.left) <= 0) && !((bcr.left + this.right) >= w && (bcr.right + this.right) >= (mw + w))); //上下符合条件
        var boolY = (!((bcr.bottom - this.top) <= 0 && ((bcr.top + mh) - this.top) <= 0) && !((bcr.top + this.bottom) >= h && (bcr.bottom + this.bottom) >= (mh + h))); //上下符合条件
        if (el.width != 0 && el.height != 0 && boolX && boolY) {
            return true;
        } else {
            return false;
        }
    };
    /**
     * 遍历DOM查询是否符合加载条件
     */
    myScroll.prototype.eachDOM = function(e) { 
        var length = this.el.length; 
        for (var i = 0; i < length; i++) {
            if (this.testMeet(this.el[i]) === true) {
            	switch(this.status){
            		case 'loading':    
                        this.startCall(); 
            			break;
            		case 'loaded':
            			this.loadCall();
            			this.endCall();
            			break;
            		case 'err':
            			this.errorCall();
            			break;
            	}
                return;
            }

        }
    };
	function getEl(select) { 
		switch (typeof select){
			case 'string': 
				return document.querySelectorAll(select);
			case 'object':
				if (Object.prototype.toString.call(select) === '[Object Array]') {
					return select;
				}else{
					return [select];
				}
		}
	} 
	return myScroll;
});

 