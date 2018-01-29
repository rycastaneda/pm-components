import * as actions from './actionTypes';
import { API_DATA_REQUEST, API_DATA_SUCCESS } from '../../middleware/api';
import merge from 'lodash/merge';

const initialState = {
    meta: {},
    toggleHintBox: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case API_DATA_SUCCESS:
            return merge(
                {},
                state,
                merge({}, action.response, {
                    meta: { [action.endpoint]: { loading: false } },
                })
            );

        case API_DATA_REQUEST:
            return merge({}, state, {
                meta: { [action.endpoint]: { loading: true } },
            });


        case actions.PM_BOILERPLATE_CHANGE_UPDATE_ACTION_NAME:
            return {
                ...state,
                toggleHintBox: !state.toggleHintBox,
            };

        default:
            return state;
    }
};

export default reducer;
