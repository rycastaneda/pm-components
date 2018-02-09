import * as actions from '../constants';
import axios from 'axios';

export function fetchSections(
    isReadOnly,
    currentStaffId,
    preferredSupplierId,
    supplierUserId
) {
    return dispatch => {
        dispatch({
            type: actions.FETCH_SECTIONS,
            isReadOnly,
            currentStaffId,
            preferredSupplierId,
            supplierUserId
        });

        return axios
            .get(
                `/preferred-suppliers/${preferredSupplierId}/compliance-sections?include=fields.values,fields.supplierUploads,defaultAssignments,assignments,comments`
            )
            .then(response => {
                return dispatch({
                    type: actions.RECEIVE_SECTIONS,
                    sections: response.data
                });
            });
    };
}

export function toggleManageSectionModal(sectionId) {
    return {
        type: actions.TOGGLE_MANAGE_SECTION_MODAL,
        sectionId
    };
}

export function toggleSectionCollapse(sectionId) {
    return {
        type: actions.TOGGLE_SECTION_COLLAPSE,
        sectionId
    };
}

export function toggleAllSectionsCollapse() {
    return (dispatch, getState) => {
        let { expandAll } = getState().ui;

        dispatch({
            type: actions.TOGGLE_ALL_SECTION_COLLAPSE,
            expandAll: !expandAll
        });
    };
}

export function toggleSectionLoading(sectionId) {
    return {
        type: actions.TOGGLE_SECTION_LOADING,
        sectionId
    };
}

export function switchSectionTab(sectionId, currentTab) {
    return {
        type: actions.SWITCH_SECTION_TAB,
        sectionId,
        currentTab
    };
}
