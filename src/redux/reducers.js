// import { combineReducers } from 'redux'
// import { 
//     REQUEST_BOOK_MODULE,
// 	RECEIVE_BOOK_MODULE
// } from '../actions'

// const bookModule = (state = {},action) => {
	 
// 	switch (action.type) {
// 		case RECEIVE_BOOK_MODULE:
		 
// 			return {
// 				...state,
// 				[action.moduleName]:{
// 					isFetching: false,
//         			didInvalidate: false,
//         			lastUpdated: action.receivedAt,
//         			data:action.books,
//         			loaded:true
// 				} 
// 			}
// 		case REQUEST_BOOK_MODULE:
		  
// 			return {
// 				...state,
// 				[action.moduleName]:{
// 					isFetching: true,
//         			didInvalidate: false,
//         			loaded:false
// 				}
				
// 			}
// 		default:
// 			return state
// 	}
// }
// const rootReducer = combineReducers({ 
// 	bookModule
// })

// export default rootReducer


import bookModule from '../views/HomeRedux'; 
import bookDetail from '../views/BookRedux';
import chapterList from '../views/ChapterListRedux';
import chapterDetail from '../views/ChapterDetailRedux';
import categoryList from '../views/CategoryRedux';

export default {
  bookModule,
  bookDetail,
  chapterList,
  chapterDetail,
  categoryList
};

