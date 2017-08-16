import { serverUrl, port } from '../../utils/Config'; 
export const REQUEST_LIST = 'REQUEST_LIST';
export const RECEIVE_LIST = 'RECEIVE_LIST'; 
export const RECRIVE_LIST_FAILED = 'RECRIVE_LIST_FAILED'; 

export const requestList = (cid, pageIndex, pageSize) => ({
	type:REQUEST_LIST,
	cid,
	pageIndex,
	pageSize
});

export const receiveList = (json) => ({
	type:RECEIVE_LIST,
	list:json
})

export const receiveListFailed = () =>({
	type:RECRIVE_LIST_FAILED
})

const fetchList = (cid, pageIndex, pageSize) => dispatch => {
	dispatch(requestList(cid));
	return fetch(`http://${serverUrl}:${port}/sort/${cid}/${pageIndex}/${pageSize}`)
		.then(response => response.json())
		.then(json => {
			dispatch(receiveList(json))
		}).catch(e =>{ 
			return dispatch(receiveListFailed())
		})
}

export const getList = (cid, pageIndex, pageSize) => dispatch => {
	return dispatch(fetchList(cid, pageIndex, pageSize));
}

const List = (state = {}, action) => {
	switch (action.type){
		case REQUEST_LIST:
			return {...state,...{
				isFetching: true,
        		didInvalidate: false,
        		loaded:false
			}}
		case RECEIVE_LIST:
			//let myArray = (state&&state.data);  
		    //myArray = myArray?myArray:[]; 
			return {
				...state,
				...{
					isFetching: false,
        			didInvalidate: false,
        			loaded:true,
        			//data:myArray.concat(action.list)
        			data: action.list.data,
        			pageId: action.list.pageid,
        			pageSize: action.list.pagesize
				}
			}
		case RECRIVE_LIST_FAILED: 
			return {
				...state,
				isFetching:false,
				didInvalidate:true,
				loaded:false,
				error: action.list.error
			}
		default:
			return state;
	}
}
export default List;