import * as actions from './actionTypes';
import merge from 'deepmerge';
import { API_DATA_REQUEST, API_DATA_SUCCESS } from '../../middleware/api';


const initialState = {
    interactions: [],
    isLoading: false,
    maxRowsList: ['10', '15', '30'],
    maxRowsSelected: '15',
    meta: {},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case API_DATA_SUCCESS:
            return merge(
                state,
                merge(action.response, { meta: { [action.endpoint]: { loading: false } } })
            );


        case API_DATA_REQUEST:
            return merge(state, { meta: { [action.endpoint]: { loading: true } } });


        case actions.SUPPLIER_INTERACTIONS_SHOW_ROWS_CHANGE_UPDATE:
            return {
                ...state,
                maxRowsSelected: action.rows,
            };

        default:
            return state;
    }
};

export default reducer;
