import serverUrl from '../../utils/Config';
export const REQUEST_CATEGORY_LIST = 'REQUEST_CATEGORYLIST';
export const RECEIVE_CATEGORY_LIST = 'RECEIVE_CATEGORYLIST'; 

export const requestCategoryList = () => ({
	type:REQUEST_CATEGORY_LIST
});

export const receiveCategoryList = (json) =>({
	type:RECEIVE_CATEGORY_LIST,
	categoryList:json
})

const fetchCategoryList = () => dispatch => {
	dispatch(requestCategoryList());
	return fetch(`http://${serverUrl}:4000/categorylist`)
		.then(response => response.json())
		.then(json => {   
			dispatch(receiveCategoryList(json))
		}).catch(e =>  
			dispatch(receiveCategoryList('服务器错误'))
		)
}

export const getCategoryList = () => dispatch => {
	return dispatch(fetchCategoryList());
}

const categoryList = (state={categoryList:{}}, action) => {
	switch (action.type) {
		case REQUEST_CATEGORY_LIST:
			return {...state,
				categoryList:{
					isFetching: true,
        			didInvalidate: false,
        			loaded:false
				}
			}
		case RECEIVE_CATEGORY_LIST: 
			return {...state,
				categoryList:{
					data:action.categoryList,
					isFetching: false,
        			didInvalidate: false,
        			loaded:true,
				}
			}
		default:
			return state;
	}
}
export default categoryList;