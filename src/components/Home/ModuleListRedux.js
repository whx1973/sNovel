import { serverUrl, port } from '../../utils/Config';

export const REQUEST_BOOK_MODULE = 'REQUEST_BOOK_MODULE';
export const RECEIVE_BOOK_MODULE = 'RECEIVE_BOOK_MODULE';

export const requestBookModule = (moduleName,count) => ({
	type: REQUEST_BOOK_MODULE,
	moduleName,
	count
})
export const receiveBookModule = (moduleName,json) => ({
	 type:RECEIVE_BOOK_MODULE,
	 books:json.data,
	 moduleName,
	 receivedAt: Date.now()
})

const fetchModuleBooks = (moduleName,count) => dispatch => { 
	//console.log(moduleName)
	dispatch(requestBookModule(moduleName,count))
	return fetch(`http://${serverUrl}:${port}/moduleName/${moduleName}/${count}`)
		.then(response => response.json())
		.then(json => dispatch(receiveBookModule(moduleName,json)))
}

export const getBookModule = (moduleName,count=3) => dispatch => {  
	return dispatch(fetchModuleBooks(moduleName,count))
}

const bookModule = (state = {},action) => {   
	switch (action.type) {
		case RECEIVE_BOOK_MODULE:
		   
			return {
				...state,
				[action.moduleName]:{
					isFetching: false,
        			didInvalidate: false,
        			lastUpdated: action.receivedAt,
        			data:action.books,
        			loaded:true
				} 
			}
		case REQUEST_BOOK_MODULE:
		  
			return {
				...state,
				[action.moduleName]:{ 
					isFetching: true,
        			didInvalidate: false,
        			loaded:false
				}
				
			}
		default:
			return state
	}
}
export default bookModule;