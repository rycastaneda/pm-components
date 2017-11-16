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
            .catch(() => dispatch({ type: actions.API_ERROR }));
    };
}

export function toggleSectionCollapse(sectionId) {
    return {
        type: actions.TOGGLE_SECTION_COLLAPSE,
        sectionId
    };
}
