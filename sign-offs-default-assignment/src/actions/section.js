import mockSections from '../mocks/sections.json';
import * as actions from '../constants/ActionTypes';
import axios from 'axios';

export function fetchSections(isReadOnly, staffId) {
    return dispatch => {
        dispatch({
            type: actions.FETCH_SECTIONS,
            isReadOnly,
            staffId
        });

        // TODO: api endpoint
        return axios.get('/anything').then(() => {
            return dispatch({
                type: actions.RECEIVE_SECTIONS,
                sections: mockSections
            });
        });
    };
}

export function toggleSectionCollapse(sectionId) {
    return {
        type: actions.TOGGLE_SECTION_COLLAPSE,
        sectionId
    };
}
