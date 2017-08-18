import React from 'react';
import styles from './chapterfooter.css';

class SettingBox extends React.Component {
	constructor(props) {
		super(props);
		this.setbgColorAndfgColor = this.setbgColorAndfgColor.bind(this);
		this.setFont = this.setFont.bind(this); 
	}
	setbgColorAndfgColor(bgColor,fgColor) { 
		var dom = document.querySelector("#"+this.props.optEle);
		dom.style.background  = bgColor;
		dom.style.color  = fgColor;
	}
	setFont(){
		var dom = document.querySelector("#"+this.props.optEle);
		dom.style.fontSize = `${this.input.value}em`; 
	} 
	render(){
		const isShow = this.props.isShow; 
		if(isShow){
			return (
				<div className={styles.setting_box}>
					<div className={styles.setting_box}>
						<input ref={(input)=>{this.input = input }} defaultValue="1" type="range" min="1" max="3" step="0.25" onChange={this.setFont}/>
					</div> 
					<div className={styles.readSetSkin}>
						<div className={styles.normal} onClick = {this.setbgColorAndfgColor.bind(this,'#fff','#000')}>
							常规
						</div>
						<div className={styles.velours} onClick = {this.setbgColorAndfgColor.bind(this,'#FFD39B','#000')}>
							复古
						</div>
						<div className={styles.eye} onClick = {this.setbgColorAndfgColor.bind(this,'#B4EEB4','#000')}>
							护眼
						</div>
						<div className={styles.soft} onClick = {this.setbgColorAndfgColor.bind(this,'#ccc','#000')}>
							柔和
						</div>
					</div>
				</div>
			);
		}else {
			return null;
		}
	}
}


export default class ChapterFooter extends React.Component {
	constructor(props) {
		super(props);
		this.handlerSettingBox = this.handlerSettingBox.bind(this); 
		this.handlerDark = this.handlerDark.bind(this);
		this.state = {showSettingBox:false,darkMode:false};
	}
	componentWillReceiveProps(nextProps) {
		const {optShow} = nextProps;
		if(!optShow) this.setState({showSettingBox:false}); 
	}
	handlerSettingBox(){
		this.setState({showSettingBox:!this.state.showSettingBox}); 
	}
	handlerDark(){
		this.setState({darkMode:!this.state.darkMode});
		this.dark.innerText = this.state.darkMode?"夜间":"日间";
		var dom = document.querySelector("#"+this.props.optEle); 
		if(!this.state.darkMode){
			dom.style.background = '#000';
			dom.style.color = '#fff';
		}else{
			dom.style.background = '#fff';
			dom.style.color = '#000';
		}
	}
	render() {
		const optShow = this.props.optShow; 
		if(optShow){
			return (
				<div className={styles.bottomfixed}> 
					<SettingBox isShow = {this.state.showSettingBox} optEle = {this.props.optEle}/>
					<footer className={styles.footer}>
						<div className={styles.footer_item}><a>目录</a></div>
						<div className={styles.footer_item}><a onClick = {this.handlerSettingBox}>设置</a></div>
						<div className={styles.footer_item}><a onClick = {this.handlerDark} ref={dark=>{this.dark = dark}}>夜间</a></div>
						<div className={styles.footer_item}><a>评论</a></div>
					</footer>
				</div>
			)
		}else{
			return null;
		}
		
	}
}
