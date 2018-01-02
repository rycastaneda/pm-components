import axios from 'axios';
import {
    getDataFromAssignmentService,
    getAssignmentServiceUrlFor,
    parseInitializeResponse,
    parseAssignmentFromAssignmentStatusData
} from '../utils/dataParserUtil';
import {
    REQUEST_FAILED,
    EVALUATION_ASSIGMENTS_FETCHED,
    EVALUATION_STATUS_UPDATED,
    EVALUATION_ASSIGNMENT_DELETE,
    INITIALIZED,
    IS_BUSY,
    EVALUATION_ASSIGNMENTS_LIST_UPDATE_CHANGE_ROWS_LENGTH,
} from '../constants/ActionTypes';
import {
    EVALUATION_ASSIGNMENT_SERVICE,
    getDataForMarkInProgress
} from '../utils/dataParserUtil';
import { MAXROWS_DEFAULT } from '../constants/DataConstants';
import { MESSAGE_TYPE_ERROR } from '../notification/constants';
import { showNotification } from '../notification/actions';

export function previewTemplate(id) {
    id;
}
export function onExportAsCSV() {
    return (dispatch, getState) => {
        let {
            selectedLinkedTo,
            selectedTemplate,
            selectedAssignedTo,
            selectedSupplier,
            selectedAssignedOn,
            preferred_supplier_id,
        } = getState().evaluationAssignments;
        let queryParams = {
            selectedLinkedTo,
            selectedTemplate,
            selectedAssignedTo,
            selectedSupplier,
            selectedAssignedOn,
            preferred_supplier_id
        };
        axios.get(getAssignmentServiceUrlFor(queryParams, true)).then((response) => {
            let encodedUri = encodeURI(response.data);
            var link = document.createElement('a');
            link.setAttribute('href', 'data:text/csv;charset=utf-8,'+encodedUri);
            link.setAttribute('target', '_blank');
            link.setAttribute('download', 'assignments.csv');
            document.body.appendChild(link); // Required for FF
            link.click();
            document.body.removeChild(link);
        })
        .catch((error) => {
            window.console.log(error.message);
            let { message } = error;
            dispatch({ type:REQUEST_FAILED });
            dispatch(showNotification(MESSAGE_TYPE_ERROR, message));
        });
    };
}
export function onEvaluationAssignmentDelete(id) {
    return (dispatch) => {
        axios.delete('evaluation-template-assignments/'+id).then(() => {
            dispatch({ type: EVALUATION_ASSIGNMENT_DELETE, id });
        })
        .catch((error) => {
            let { message } = error;
            dispatch({ type:REQUEST_FAILED });
            dispatch(showNotification(MESSAGE_TYPE_ERROR, message));
        });
    };
}

export function initialize() {

    return (dispatch) => {
        dispatch(isBusy(true));
        axios.all([
            // should be replaced by user profile service
            axios.get('user?include=staff.pitRoles'),
            axios.get('evaluation-templates'),
            axios.get('evaluation-template-assignment-types'),
            axios.get('evaluation-template-assignment-statuses'),
            axios.get('staff'),
            axios.get('preferred-suppliers'),
            getPromiseForService(
                getAssignmentServiceUrlFor({ maxRowLength: MAXROWS_DEFAULT, currentPage:1 }),
                dispatch
            )

        ]).then((response) => {
            let userProfile = response[0].data;
            let evaluationTemplates = response[1].data;
            let evaluationTemplateAssignmentTypes =response[2].data;
            let evaluationTemplateAssignmentStatuses =response[3].data;
            let staff = response[4].data;
            let preferredSuppliers = response[5].data;
            let evaluationAssignments = response[6].data;
            let result = parseInitializeResponse({ userProfile, evaluationTemplates,
                evaluationTemplateAssignmentTypes,
                evaluationTemplateAssignmentStatuses,
                staff,
                preferredSuppliers,
                evaluationAssignments });
            dispatch({ type:INITIALIZED,  ...result });
        });
    };
}
export function onMarkInProgress(id) {
    return  (dispatch, getState) => {
        axios.patch(EVALUATION_ASSIGNMENT_SERVICE+'/'+id, getDataForMarkInProgress(id))
        .then((response) => {
            let { userProfile, evaluationAssignments } = getState().evaluationAssignments;
            let assignment  = evaluationAssignments.filter(item => item.id===id)[0];
            assignment = parseAssignmentFromAssignmentStatusData(response.data, assignment, userProfile);
            dispatch({ type: EVALUATION_STATUS_UPDATED, id, assignment });
        })
        .catch((error) => {
            let { message } = error;
            dispatch(showNotification(MESSAGE_TYPE_ERROR, message));
            dispatch({ type: REQUEST_FAILED });
        });
    };
}
export function onEvaluationTemplatesPageChange(currPage) {
    return (dispatch, getState) => {
        dispatch(isBusy(true));
        let { maxRowLength, selectedLinkedTo,
        selectedTemplate,
        selectedAssignedTo,
        selectedSupplier,
        selectedAssignedOn,
        preferred_supplier_id,
        userProfile } = getState().evaluationAssignments;
        let queryParams = {
            maxRowLength,
            currentPage:currPage,
            selectedLinkedTo,
            selectedTemplate,
            selectedAssignedTo,
            selectedSupplier,
            selectedAssignedOn,
            preferred_supplier_id };
        getPromiseForAssignmentService(getAssignmentServiceUrlFor (queryParams), queryParams, userProfile, dispatch);
    };
}

export function onEvaluationTemplatesDisplayedLengthChange(perPage) {
    return (dispatch, getState) => {
        dispatch(isBusy(true));
        let { selectedLinkedTo,
        selectedTemplate,
        selectedAssignedTo,
        selectedSupplier,
        selectedAssignedOn,
        selectedEntityInstanceId,
        userProfile } = getState().evaluationAssignments;
        let queryParams = {
            maxRowLength:perPage,
            currentPage:1,
            selectedLinkedTo,
            selectedTemplate,
            selectedAssignedTo,
            selectedSupplier,
            selectedAssignedOn,
            selectedEntityInstanceId };

        dispatch({
            type: EVALUATION_ASSIGNMENTS_LIST_UPDATE_CHANGE_ROWS_LENGTH,
            perPage
        });

        getPromiseForAssignmentService(getAssignmentServiceUrlFor(queryParams), queryParams, userProfile, dispatch);
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
        dispatch(isBusy(true));
        const state= getState().evaluationAssignments;
        let { maxRowLength, currentPage, userProfile } = state;
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
        getPromiseForAssignmentService(getAssignmentServiceUrlFor(queryParams), queryParams, userProfile, dispatch);
    };
}

function getPromiseForAssignmentService(url, queryParams, userProfile, dispatch) {
    return getPromiseForService(url, dispatch)
    .then((response) => {
        if (response) {
            let result = getDataFromAssignmentService(response.data, userProfile);
            dispatch({ type:EVALUATION_ASSIGMENTS_FETCHED, ...result, ...queryParams });
        }
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
