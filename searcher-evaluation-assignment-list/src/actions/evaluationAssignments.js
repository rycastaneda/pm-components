import axios from 'axios';
import { getTemplateServiceUrlFor,
    getDataFromAssignmentService,
    getAssignmentServiceUrlFor,
    parseInitializeResponse
} from '../utils/dataParserUtil';
import {
    REQUEST_FAILED,
    EVALUATION_ASSIGMENTS_FETCHED,
    INITIALIZED,
    IS_BUSY
} from '../constants/ActionTypes';
import { MAXROWS_DEFAULT } from '../constants/DataConstants';
export function previewTemplate(id) {
    id;
}


export function initialize() {

    return (dispatch) => {
        axios.all([
            axios.get('evaluation-templates?[active=1]'),
            axios.get('evaluation-template-assignment-types'),
            axios.get('evaluation-template-assignment-statuses'),
            axios.get('staff'),
            axios.get('preferred-suppliers'),
            getPromiseForService(
                getAssignmentServiceUrlFor(MAXROWS_DEFAULT, 1),
                dispatch
            )
        ]).then((response) => {

            let evaluationTemplates = response[0].data;
            let evaluationTemplateAssignmentTypes =response[1].data;
            let evaluationTemplateAssignmentStatuses =response[2].data;
            let staff = response[3].data;
            let preferredSuppliers = response[4].data;
            let evaluationAssignments = response[5].data;

            let result = parseInitializeResponse({ evaluationTemplates, evaluationTemplateAssignmentTypes, evaluationTemplateAssignmentStatuses, staff, preferredSuppliers, evaluationAssignments });
            dispatch({ type:INITIALIZED,  ...result });
        });
    };
}
export function fetchEvaluationTemplates() {
    return (dispatch) => {
        getPromiseForAssignmentService(getTemplateServiceUrlFor(), dispatch);
    };
}

export function onEvaluationTemplatesPageChange(currPage) {
    return (dispatch, getState) => {
        let { perPage, selectedLinkedTo,
        selectedTemplate,
        selectedAssignedTo,
        selectedSupplier,
        selectedAssignedOn } = getState().evaluationAssignments;
        
        getPromiseForAssignmentService(getAssignmentServiceUrlFor (perPage, currPage, selectedLinkedTo,
        selectedTemplate,
        selectedAssignedTo,
        selectedSupplier,
        selectedAssignedOn), dispatch);
    };
}

export function onEvaluationTemplatesDisplayedLengthChange(perPage) {
    return (dispatch, getState) => {
        let { selectedLinkedTo,
        selectedTemplate,
        selectedAssignedTo,
        selectedSupplier,
        selectedAssignedOn } = getState().evaluationAssignments;
        getPromiseForAssignmentService(getAssignmentServiceUrlFor(perPage, 1, selectedLinkedTo,
        selectedTemplate,
        selectedAssignedTo,
        selectedSupplier,
        selectedAssignedOn), dispatch);
    };
}

export function onEvaluationAssignmentFilterChange({ selectedStatus,
    selectedLinkedTo,
    selectedTemplate,
    selectedAssignedTo,
    selectedSupplier,
    selectedAssignedOn }) {
    return (dispatch, getState) => {
        const state= getState().evaluationAssignments;
        getPromiseForAssignmentService(getAssignmentServiceUrlFor(state.maxRowLength, 1, selectedStatus,
        selectedLinkedTo,
        selectedTemplate,
        selectedAssignedTo,
        selectedSupplier,
        selectedAssignedOn), dispatch);
    };
}

function getPromiseForAssignmentService(url, dispatch) {
    return getPromiseForService(url, dispatch)
    .then((response) => {
        let result = getDataFromAssignmentService(response.data);
        dispatch({ type:EVALUATION_ASSIGMENTS_FETCHED, ...result });
    });
}
function getPromiseForService(url, dispatch) {
    return axios.get(url)
    .catch((error) => {
        dispatch({ type:REQUEST_FAILED, message: error.message });
    });
}
export function isBusy(status) {
    return {
        type: IS_BUSY,
        status
    };
}
