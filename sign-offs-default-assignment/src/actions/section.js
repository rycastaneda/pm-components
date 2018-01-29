import * as actions from '../constants/ActionTypes';
import axios from 'axios';

export function fetchSections(panelId) {
    return dispatch => {
        dispatch({
            type: actions.FETCH_SECTIONS,
            panelId
        });

        return axios
            .get(
                `/compliance/default-assignments/${panelId}?include=defaultAssignments`
            )
            .then(response => {
                return dispatch({
                    type: actions.RECEIVE_SECTIONS,
                    sections: response.data
                });
            })
            .catch(response => {
                dispatch({
                    type: actions.API_ERROR,
                    error: response.response.data.message
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

export function toggleAllSectionCollapse() {
    return {
        type: actions.TOGGLE_ALL_SECTION_COLLAPSE
    };
}
