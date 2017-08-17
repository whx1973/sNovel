import { serverUrl, port } from '../../utils/Config';
export const REQUEST_BOOK_DETAIL = 'REQUEST_BOOK_DETAIL';
export const RECEIVE_BOOK_DETAIL = 'RECEIVE_BOOK_DETAIL';

export const requestBookDetail = (bookId) => ({
	type:REQUEST_BOOK_DETAIL,
	bookId
});

export const receiveBookDetail = (json) => ({
	type:RECEIVE_BOOK_DETAIL,
	bookInfo:json.result
});
 
const fetchBookDetail = (bookId) => dispatch => {   
	dispatch(requestBookDetail(bookId));  
	return fetch(`http://${serverUrl}:${port}/book/${bookId}`)
		.then(response => response.json())
		.then(json => dispatch(receiveBookDetail(json)));
}
export const getBookDetail = (bookId) => dispatch => { 
	return dispatch(fetchBookDetail(bookId));
}


const bookDetail = (state = {},action) => {  
	switch (action.type) { 
		case RECEIVE_BOOK_DETAIL: 
			return {
				...state,
				...{
					isFetching: false,
        			didInvalidate: false,
        			loaded:true,
        			data:action.bookInfo
				}
			}
		case REQUEST_BOOK_DETAIL: 
			return {
				...state,
				...{
					isFetching: true,
        			didInvalidate: false,
        			loaded:false
				}
			}
		default:
			return state;
	}
}


export default bookDetail;