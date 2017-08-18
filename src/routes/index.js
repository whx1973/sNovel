import React from 'react';
import {Router, Route, hashHistory, browserHistory, IndexRoute, applyRouterMiddleware } from 'react-router';  
import Frame from '../Layouts/Frame'; 
import Home from '../views/Home';
import BookDetail from '../views/BookDetail'
import ChapterDetail from '../views/ChapterDetail';
import Catalog from '../views/Catalog';
import List from '../views/List';
import Category from '../views/Category';
import NotFound from '../views/NotFound'; 

const routes = (history) => ( 
	<Router history = { history }> 
      <Route path='/list/:cid/:pageId' component = {List} />
      <Route path='/chapter/:bid/:cid' component = {ChapterDetail} />
      <Route path='/book/:id' component={BookDetail} />
      <Route path='/category' component= {Category}/>
      <Route path='/catalog/:bid' component = {Catalog} /> 
      <Route path='/' component= {Frame} >
  			<IndexRoute component={Home} />  
        <Route path="*" component={NotFound} />
  		</Route>

  	</Router>
);
export default routes;