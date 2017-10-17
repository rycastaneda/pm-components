import * as actions from '../constants';
import { includes } from 'lodash';

const INITIAL_STATE = { 
    byId: {},
    allIds: [],
    needsFetching: true,
    isLoading: false
};

export function staff(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_SECTIONS:
            return receiveSections(state, action);
        case actions.SUBMITTED_NEW_COMMENT: // save staff upon new comment
            return receiveComment(state, action);
        case actions.TOGGLE_MANAGE_SECTION_MODAL_LOADING: 
            state.isLoading = !state.isLoading;
            return { ...state };
        case actions.RECEIVE_STAFF: 
            state.needsFetching = false;
            receiveStaff(state, action);
            return { ...state };
        case actions.TOGGLE_STAFF_LOADING:
            state.byId[action.staffId].isLoading = !state.byId[action.staffId].isLoading;
            return { ...state };
    }

    return state;
}

function receiveSections(state, action) {
    const byId = {};
    const allIds = [];

    action.sections.included
        .filter(include => include.type === 'staff')
        .map((staff) => {
            byId[staff.id] = {
                id: staff.id,
                ...staff.attributes,
                isLoading: false
            };

            allIds.push(staff.id);

            return staff;
        });

    return {
        ...state,
        byId,
        allIds
    };
}

function receiveComment(state, action) {
    state.byId[action.staffId] = {
        id: action.staffId,
        name: action.staffName
    };
    
    state.allIds.push(action.staffId);

    return { ...state };
}

function receiveStaff(state, action) {
    action.staffs.data
        .map((staff) => {
            state.byId[staff.id] = {
                id: staff.id,
                ...staff.attributes,
                isLoading: false
            };

            if (!includes(state.allIds, staff.id)) {
                state.allIds.push(staff.id);
            }

            return staff;
        });

    return { ...state };
}