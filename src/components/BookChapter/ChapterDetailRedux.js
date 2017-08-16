import { serverUrl, port }  from '../../utils/Config';
export const REQUEST_CHAPTER_DETAIL = 'REQUEST_CHAPTER_DETAIL';
export const RECEIVE_CHAPTER_DETAIL = 'RECEIVE_CHAPTER_DETAIL'; 
export const RECRIVE_CHAPTER_FAILED = 'RECRIVE_CHAPTER_FAILED'; 

export const requestChapterDetail = (bookId,chapterId) => ({
	type:REQUEST_CHAPTER_DETAIL,
	bookId,
	chapterId
});

export const receiveChapterDetail = (json) =>({
	type:RECEIVE_CHAPTER_DETAIL,
	chapterDetail:json.result
})

export const receiveChapterFailed = () =>({
	type:RECRIVE_CHAPTER_FAILED
})

const fetchChapterDetail = (bookId, chapterId ) => dispatch => {
	dispatch(requestChapterDetail(bookId,chapterId));
	return fetch(`http://${serverUrl}:${port}/chapter/${bookId}/${chapterId}`)
		.then(response => response.json())
		.then(json => {   
			dispatch(receiveChapterDetail(json))
		}).catch(e =>  
			dispatch(receiveChapterFailed())
		)
}

export const getChapterDetail = (bookId, chapterId) => dispatch => {
	return dispatch(fetchChapterDetail(bookId, chapterId));
}

const chapterDetail = (state={}, action) => {
	switch (action.type) {
		case REQUEST_CHAPTER_DETAIL: 
			return {...state,
				...{
					isFetching: true,
        			didInvalidate: false,
        			loaded:false
				}
			}
		case RECEIVE_CHAPTER_DETAIL: 
			return {...state,
				...{
					data:action.chapterDetail,
					isFetching: false,
        			didInvalidate: false,
        			loaded:true,
				}
			}
		case RECRIVE_CHAPTER_FAILED:
			return {
				...state,
				isFetching:false,
				didInvalidate:true,
				loaded:true
			}
		default:
			return state;
	}
}
export default chapterDetail;