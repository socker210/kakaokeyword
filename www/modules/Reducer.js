/* React Modules */
import { Map } from "immutable";
import { createAction, handleActions } from "redux-actions";

/* User Components */
import { api } from "api";


// InitialState
const initialState = Map({
	// Any notification
	//   msg: Result or state messages
	//   is_open: Message popup state (Collapse or expand)
	notification: Map({
		msg: '',
		is_open: false
	}),
	// Search parameters
	//    query: Place name
	// 	  page: Contents page count
	// 	  isCanPrev: Validate of Previous page indicator
	// 	  isCanNext: Validate of Next page indicator
	search: Map({
		query: '',
		page: 1,
		isCanPrev: false,
		isCanNext: false
	}),
	// Action state
	//	  action: Searching state (NOITEM,PENDING,DONE)
	state: Map({
		action: 'NOITEM'
	}),
	// RESTful API result
	//	  contents: Data
	//	  meta: Metadata
	data:Map({
		contents:[],
		meta: {}
	})
});


// Action Types
//	  Message
const _MESSAGE_SEND = 'MESSAGE_SEND';
const _MESSAGE_CLOSE = 'MESSAGE_CLOSE';
export const MESSAGE_SEND = createAction(_MESSAGE_SEND);
export const MESSAGE_CLOSE = createAction(_MESSAGE_CLOSE);

//	  Search
const _SEARCH_PENDING = 'SEARCH_PENDING';
const _SEARCH_SUCCESS = 'SEARCH_SUCCESS';
const _SEARCH_FAILURE = 'SEARCH_FAILURE';
export const SEARCH_PENDING = createAction(_SEARCH_PENDING);
export const SEARCH_SUCCESS = createAction(_SEARCH_SUCCESS);
export const SEARCH_FAILURE = createAction(_SEARCH_FAILURE);


// Reducer
export default handleActions({
	/* Message */
	[_MESSAGE_SEND]: (state,action) => {
		// Set notification's msg & state
		return state.setIn(['notification','is_open'],true)
			        .setIn(['notification','msg'],action.payload.msg);
	},
	[_MESSAGE_CLOSE]: (state,action) => {
		// Close notification's state
		return state.setIn(['notification','is_open'],false)
			        .setIn(['notification','msg'],'');
	},

	/* Search */
	[_SEARCH_PENDING]: (state,action) => {
		// Update state by PENDING mode & Initialize PageIndicator variables
		return state.setIn(['search','query'],action.payload.query)
					.setIn(['search','page'],action.payload.page)
					.setIn(['search','isCanPrev'],false)
					.setIn(['search','isCanNext'],false)
					.setIn(['state','action'],'PENDING');
	},
	[_SEARCH_SUCCESS]: (state,action) => {
		// Set data to contents & update state by DONE mode & Set PageIndicator variables
		let act = action.payload.data.documents.length == 0? 'NOITEM' : 'DONE';
		let isCanPrev = state.getIn(['search','page']) != 1;
		let isCanNext = !action.payload.data.meta.is_end;

		return state.setIn(['search','isCanPrev'],isCanPrev)
					.setIn(['search','isCanNext'],isCanNext)
					.setIn(['state','action'],act)
					.setIn(['data','contents'],action.payload.data.documents)
					.setIn(['data','meta'],action.payload.data.meta);
	},
	[_SEARCH_FAILURE]: (state,action) => {
		// Show error message to users
		let err = 'State:[ '+action.payload.status+' ]  ' +
				   'Error Type:[ '+action.payload.data.errorType+' ]  ' +
				   'Server Message:[ '+action.payload.data.message+' ]';

		return state.setIn(['notification','is_open'],true)
			        .setIn(['notification','msg'],err)
			        .setIn(['state','action'],'DONE');
	}
}, initialState);


// Action Executor (Redux thunk middleware)
//	  Search Query
export const execActAsThunkToSearchQuery = (query) => {
	return (dispatch,getState) => {
		// Validate of query
		if (!query) {
			let params = {msg:'장소를 입력해 주세요'}
			dispatch(MESSAGE_SEND(params));
		}
		else {
			// Update state by PENDING mode & Initialize Page number
			let params = {
				query:query ,
				page: 1
			}
			dispatch(SEARCH_PENDING(params));

			// Querying to API Server
			var state = getState();
			params = {
				params: {
					query: query,
					page: state.getIn(['search','page'])
				},
				api: 'keyword'
			}

			api(params)
			.then((response) => dispatch(SEARCH_SUCCESS(response)))
			.catch((error) => dispatch(SEARCH_FAILURE(error.response)));
		}
	}
}

//	  Paging
export const execActAsThunkToPaging = (number) => {
	return (dispatch,getState) => {
		// Calc Page
		var query = getState().getIn(['search','query']);
		var page = getState().getIn(['search','page']) + number; 

		// Update state by PENDING mode & Set Page number
		let params = {
			query:query ,
			page: page
		}
		dispatch(SEARCH_PENDING(params));

		// Querying to API Server
		params = {
			params: {
				query: query ,
				page: page
			},
			api: 'keyword'
		}

		api(params)
		.then((response) => dispatch(SEARCH_SUCCESS(response)))
		.catch((error) => dispatch(SEARCH_FAILURE(error.response)));
	}
}