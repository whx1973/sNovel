import React from 'react';
import {Router, Route, hashHistory, browserHistory, IndexRoute, applyRouterMiddleware } from 'react-router'; 
import { useScroll } from 'react-router-scroll';
import Frame from '../Layouts/Frame'; 
import Home from '../views/Home';
import BookDetail from '../views/BookDetail'
import ChapterDetail from '../views/ChapterDetail';
import Catalog from '../views/Catalog';
import List from '../views/List';
import Category from '../views/Category';
import NotFound from '../views/NotFound';

import Test from '../views/Test';

useScroll((prevRouterProps, { location }) => (
  prevRouterProps && location.pathname !== prevRouterProps.location.pathname
));

useScroll((prevRouterProps, { routes }) => {
  alert(routes);
  if (routes.some(route => route.ignoreScrollBehavior)) {
    return false;
  }

  if (routes.some(route => route.scrollToTop)) {
    return [0, 0];
  }

  return true;
});

const routes = (history) => ( 
	<Router history = { history } render={applyRouterMiddleware(useScroll())}>
      <Route path = '/test' component = { Test } />
      <Route path='/list/:cid/:pageId' component = {List} />
      <Route path='/chapter/:bid/:cid' component = {ChapterDetail} />
      <Route path='/book/:id' component={BookDetail} />
      <Route path='/category' component= {Category}/> 
  		<Route path='/' component= {Frame} >
  			<IndexRoute component={Home} /> 
        <Route path='catalog/:bid' component = {Catalog} /> 
  			
        <Route path="*" component={NotFound} />
  		</Route>

  	</Router>
);
export default routes;