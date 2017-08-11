import React from 'react';
import ReactDOM from 'react-dom';
require('./styles/reset.css');

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux'; 

import { Router, Route, hashHistory} from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'; 
import rootReducer from './redux/reducers'; 
import routes from './routes';



const middleware = [ thunk ];
//middleware.push(createLogger());
const reducer = combineReducers({
  ...rootReducer,
  routing: routerReducer
});  

const store = createStore(
  reducer,
  applyMiddleware(...middleware) 
) 

const history = syncHistoryWithStore(hashHistory, store);

//history.listen(location => console.log(location.pathname))
ReactDOM.render((
  <Provider store={store}>
  	 {routes(history)}
	</Provider>
  ),document.getElementById('root'));


//store.subscribe(render)