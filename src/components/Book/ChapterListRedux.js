
import { serverUrl, port } from '../../utils/Config';
export const REQUEST_CHAPTER_LIST = 'REQUEST_CHAPTER_LIST';
export const RECEIVE_CHAPTER_LIST = 'RECEIVE_CHAPTER_LIST'; 

export const requestChapterList = (bookId,pageId, pageSize, order) => ({
	type:REQUEST_CHAPTER_LIST,
	pageId,
	bookId,
	pageSize,
	order
});
export const receiveChapterList = (json) =>({
	type:RECEIVE_CHAPTER_LIST,
	chapterList:json
})

const fetchChapterList = (bookId,pageId = 1, pageSize = 10, order = 0) =>dispatch => { 
	dispatch(requestChapterList(bookId,pageId, pageSize, order));
	return fetch(`http://${serverUrl}:${port}/chapterlist/${bookId}/${pageId}/${pageSize}/${order}`)
		.then(response => response.json())
		.then(json => dispatch(receiveChapterList(json)));
};
export const getChapterList = (bookId, pageId, pageSize, order) => dispatch => { 
	return dispatch(fetchChapterList(bookId, pageId, pageSize, order));
}

const chapterList = (state = { }, action) => {
	switch (action.type) {
		case REQUEST_CHAPTER_LIST:
			return {
				...state,
				...{ 
					isFetching: true,
        			didInvalidate: false,
        			loaded:false
				}
			}
		case RECEIVE_CHAPTER_LIST:  
			return {
				...state,
				...{ 
					isFetching: false,
        			didInvalidate: false,
        			loaded:true,
        			...action.chapterList
				}
			}
		default:
			return state;

	}
}
export default chapterList;