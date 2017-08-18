import React, { Component } from 'react';
import ModuleCon from './ModuleCon';
import Menu from '../layouts/Menu'; 
 
class Home extends Component {
	render() {
		return (
			<div>
				<Menu />  
				<ModuleCon moduleName={'新书抢先'} moduleNameCode = {'xstj'} moduleDesc= {'24小时热销新书'}/>
				<ModuleCon moduleName={'完本精选'} moduleNameCode = {'wbjx'} moduleDesc= {'一周内完本书'}/> 
				<ModuleCon moduleName={'最近更新'} moduleNameCode = {'zjgx'} moduleDesc= {'1天内更新'}/>  
			</div>
		);
	}
} 

export default Home