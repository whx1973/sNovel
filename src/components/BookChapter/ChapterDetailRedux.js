import serverUrl from '../../utils/Config';
export const REQUEST_CHAPTER_DETAIL = 'REQUEST_CHAPTER_DETAIL';
export const RECEIVE_CHAPTER_DETAIL = 'RECEIVE_CHAPTER_DETAIL'; 

export const requestChapterDetail = (bookId,chapterId) => ({
	type:REQUEST_CHAPTER_DETAIL,
	bookId,
	chapterId
});

export const receiveChapterDetail = (json) =>({
	type:RECEIVE_CHAPTER_DETAIL,
	chapterDetail:json.result
})

const fetchChapterDetail = (bookId, chapterId ) => dispatch => {
	dispatch(requestChapterDetail(bookId,chapterId));
	return fetch(`http://${serverUrl}:4000/chapter/${bookId}/${chapterId}`)
		.then(response => response.json())
		.then(json => {   
			dispatch(receiveChapterDetail(json))
		}).catch(e =>  
			dispatch(receiveChapterDetail('服务器错误'))
		)
}

export const getChapterDetail = (bookId, chapterId) => dispatch => {
	return dispatch(fetchChapterDetail(bookId, chapterId));
}

const chapterDetail = (state={chapterDetailData:{}}, action) => {
	switch (action.type) {
		case REQUEST_CHAPTER_DETAIL:
			return {...state,
				chapterDetailData:{
					isFetching: true,
        			didInvalidate: false,
        			loaded:false
				}
			}
		case RECEIVE_CHAPTER_DETAIL: 
			return {...state,
				chapterDetailData:{
					data:action.chapterDetail,
					isFetching: false,
        			didInvalidate: false,
        			loaded:true,
				}
			}
		default:
			return state;
	}
}
export default chapterDetail;