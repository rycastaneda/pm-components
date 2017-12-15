import axios from 'axios';
import {
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
import { MESSAGE_TYPE_ERROR } from '../notification/constants';
import { showNotification } from '../notification/actions';

export function previewTemplate(id) {
    id;
}


export function initialize() {

    return (dispatch) => {
        axios.all([
            axios.get('evaluation-templates?filter[active]=1'),
            axios.get('evaluation-template-assignment-types'),
            axios.get('evaluation-template-assignment-statuses'),
            axios.get('staff'),
            axios.get('preferred-suppliers'),
            getPromiseForService(
                getAssignmentServiceUrlFor({ maxRowLength: MAXROWS_DEFAULT, currentPage:1 }),
                dispatch
            )
        ]).then((response) => {

            let evaluationTemplates = response[0].data;
            let evaluationTemplateAssignmentTypes =response[1].data;
            let evaluationTemplateAssignmentStatuses =response[2].data;
            let staff = response[3].data;
            let preferredSuppliers = response[4].data;
            let evaluationAssignments = response[5].data;
            let result = parseInitializeResponse({ evaluationTemplates,
                evaluationTemplateAssignmentTypes,
                evaluationTemplateAssignmentStatuses,
                staff,
                preferredSuppliers,
                evaluationAssignments });

            dispatch({ type:INITIALIZED,  ...result });
        });
    };
}

export function onEvaluationTemplatesPageChange(currPage) {
    return (dispatch, getState) => {
        let { maxRowLength, selectedLinkedTo,
        selectedTemplate,
        selectedAssignedTo,
        selectedSupplier,
        selectedAssignedOn,
        preferred_supplier_id } = getState().evaluationAssignments;
        let queryParams = {
            maxRowLength,
            currentPage:currPage,
            selectedLinkedTo,
            selectedTemplate,
            selectedAssignedTo,
            selectedSupplier,
            selectedAssignedOn,
            preferred_supplier_id };
        getPromiseForAssignmentService(getAssignmentServiceUrlFor (queryParams), dispatch);
    };
}

export function onEvaluationTemplatesDisplayedLengthChange(perPage) {
    return (dispatch, getState) => {
        let { selectedLinkedTo,
        selectedTemplate,
        selectedAssignedTo,
        selectedSupplier,
        selectedAssignedOn,
        selectedEntityInstanceId } = getState().evaluationAssignments;
        let queryParams = {
            maxRowLength:perPage,
            currentPage:1,
            selectedLinkedTo,
            selectedTemplate,
            selectedAssignedTo,
            selectedSupplier,
            selectedAssignedOn,
            selectedEntityInstanceId };
        getPromiseForAssignmentService(getAssignmentServiceUrlFor(queryParams), queryParams, dispatch);
    };
}

export function onEvaluationAssignmentFilterChange({ selectedStatus,
    selectedLinkedTo,
    selectedTemplate,
    selectedAssignedTo,
    selectedSupplier,
    selectedAssignedOn,
    selectedEntityInstanceId }) {

    return (dispatch, getState) => {
        const state= getState().evaluationAssignments;
        let { maxRowLength, currentPage } = state;
        let queryParams = {
            maxRowLength,
            currentPage,
            selectedStatus,
            selectedLinkedTo,
            selectedTemplate,
            selectedAssignedTo,
            selectedSupplier,
            selectedAssignedOn,
            selectedEntityInstanceId };
        getPromiseForAssignmentService(getAssignmentServiceUrlFor(queryParams), queryParams, dispatch);
    };
}

function getPromiseForAssignmentService(url, queryParams, dispatch) {
    return getPromiseForService(url, dispatch)
    .then((response) => {
        let result = getDataFromAssignmentService(response.data);
        dispatch({ type:EVALUATION_ASSIGMENTS_FETCHED, ...result, ...queryParams });
    });
}
function getPromiseForService(url, dispatch) {
    return axios.get(url)
    .catch((error) => {
        let { message } = error;
        dispatch({ type:REQUEST_FAILED });
        dispatch(showNotification(MESSAGE_TYPE_ERROR, message));
    });
}
export function isBusy(status) {
    return {
        type: IS_BUSY,
        status
    };
}
