import serverUrl from '../../utils/Config';
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
	return fetch(`http://${serverUrl}:4000/book/${bookId}`)
		.then(response => response.json())
		.then(json => dispatch(receiveBookDetail(json)));
}
export const getBookDetail = (bookId) => dispatch => { 
	return dispatch(fetchBookDetail(bookId));
}


const bookDetail = (state = {bookDetailData:{}},action) => {  
	switch (action.type) {

		case RECEIVE_BOOK_DETAIL:  
			return {
				...state,
				bookDetailData:{
					isFetching: false,
        			didInvalidate: false,
        			loaded:true,
        			data:action.bookInfo
				}
			}
		case REQUEST_BOOK_DETAIL: 
			return {
				...state,
				bookDetailData:{
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