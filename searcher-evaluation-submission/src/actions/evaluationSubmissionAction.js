import axios from 'axios';
import { parseInitialize, parseDataForUpdateQuestion } from '../utils/dataParser';

import { UPDATE_TEMPLATE_ASSIGNMENT,
    DOCUMENT_UPLOAD_SUCCESS,
    DOCUMENT_UPLOAD_FAILED,
    DOCUMENT_UPLOAD_IN_PROGRESS,
    DOCUMENTS_UPLOADING,
    DOCUMENT_DELETE,
    REQUEST_FAILED,
    QUESTION_UPDATED,
    ASSIGNMENT_SUBMITTED,
    CRITERIA_UPDATED,
    IS_BUSY } from '../constants/ActionTypes';

import { MESSAGE_TYPE_ERROR, MESSAGE_TYPE_SUCCESS } from '../constants';
import { showNotification } from '../notification/actions';

export function initialize(requestedAssignmentId) {
    return (dispatch) => {
        return axios.get('/evaluation-template-assignments/'+requestedAssignmentId+'?include=template.criteria.questions')
        .then((response) => {
            let result =parseInitialize(response.data, requestedAssignmentId);
            dispatch({ type:UPDATE_TEMPLATE_ASSIGNMENT, ...result });
        })
        .catch((error) => {
            const { message }= error;
            dispatch(showNotification(MESSAGE_TYPE_ERROR, message));
            dispatch({ type:REQUEST_FAILED });
        });
    };
}
export function uploadDocuments(questionId, documents) {
    return (dispatch, getState) => {
        let { evaluationSubmission } = getState();

        let { assignmentId } = evaluationSubmission;
        let question = evaluationSubmission.questionByIndex[questionId];
        if (!question.isAttempted) {
            let message = 'Please add a comment before proceeding.';
            dispatch(showNotification(MESSAGE_TYPE_ERROR, message));
        }
        dispatch({
            type: DOCUMENTS_UPLOADING,
            questionId,
            documents
        });
        return axios.all(
            documents.map((document) => {
                let formData = new FormData();
                formData.append('document', document);
                formData.append('question_id', questionId);
                formData.append('assignment_id', questionId);
                let endpoint = '/evaluation-template-assignments/'+assignmentId;
                endpoint +='/question-responses/'+question.responseId;
                endpoint +='/documents';
                let promise = axios.post(endpoint, formData, {
                    onUploadProgress: function(progressEvent) {
                        var percentCompleted = progressEvent.loaded / progressEvent.total;
                        dispatch(incrementProgress(document.id, Math.ceil(percentCompleted * 100)));
                    }
                });
                promise.then((response) => {
                    dispatch({
                        type: DOCUMENT_UPLOAD_SUCCESS,
                        questionId,
                        documentId: document.id,
                        newDocumentId: Number(response.data.data.id),
                        url: String(response.data.data.attributes.download_url)
                    });
                    return response;
                }).catch((error) => {
                    dispatch({
                        type: DOCUMENT_UPLOAD_FAILED,
                        documentId: document.id
                    });
                    return error;
                });
                return promise;
            })
        );

    };
}

export function deleteDocument(questionId, documentId) {
    return (dispatch, getState) => {
        let { evaluationSubmission } = getState();
        let { questionByIndex, uploadedDocumentByIndex } = evaluationSubmission;
        let question = questionByIndex[questionId];
        let document = uploadedDocumentByIndex[String(documentId)];
        let { referenceId } = document;
        let { responseId } = question;
        let { assignmentId } = evaluationSubmission;
        let endpoint = '/evaluation-template-assignments/'+assignmentId;
        endpoint += '/question-responses/'+responseId;
        endpoint += '/documents/'+referenceId;
        return axios.delete(endpoint)
        .then(() => {
            DOCUMENT_DELETE;
            dispatch({ type:DOCUMENT_DELETE, questionId, documentId });
        });
    };

}
export function submitAssignment() {
    return (dispatch, getState) => {
        let { evaluationSubmission } = getState();
        let { assignmentId } = evaluationSubmission;
        let endpoint = '/evaluation-template-assignments/'+assignmentId+'/finish';
        let promise = axios.post(endpoint);
        promise.then(() => {
            dispatch({ type: ASSIGNMENT_SUBMITTED });
            let message = 'Assignment submitted successfully!';
            dispatch(showNotification(MESSAGE_TYPE_SUCCESS, message));
        }).catch((error) => {
            let { message } = error;
            dispatch(showNotification(MESSAGE_TYPE_ERROR, message));
        });
    };
}
export function setOptionValue(questionId, scaleDefinitionId, value) {
    return (dispatch, getState) => {
        let { evaluationSubmission } = getState();
        let question = { ...evaluationSubmission.questionByIndex[questionId] };
        let { assignmentId } = evaluationSubmission;
        question.selectedDefinition = value;
        updateQuestion(question, assignmentId, dispatch);
    };
}
export function setComment(questionId, comment) {
    return (dispatch, getState) => {
        let { evaluationSubmission } = getState();
        let question = { ...evaluationSubmission.questionByIndex[questionId] };
        let { assignmentId } = evaluationSubmission;
        question.comment = comment;
        updateQuestion(question, assignmentId, dispatch);

    };
}
export function criteriaMaximised(criteriaId, isMaximised) {

    return (dispatch, getState) => {
        let { evaluationSubmission } = getState();
        let criteria = { ...evaluationSubmission.criteriaByIndex[criteriaId] };
        criteria.isMaximised =isMaximised;
        dispatch({ type: CRITERIA_UPDATED, criteria });
    };
}
function updateQuestion(question, assignmentId, dispatch) {
    let promise;
    let endpoint = '/evaluation-template-assignments/'+assignmentId;
    endpoint += '/question-responses';
    let parsedQuestionData = parseDataForUpdateQuestion(question) ;
    if (question.isAttempted) {
        promise = axios.patch(endpoint+'/'+question.responseId, parsedQuestionData);
    } else {
        promise = axios.post(endpoint, parsedQuestionData);
    }
    promise.then(() => {
        dispatch({ type: QUESTION_UPDATED, question });
    }).catch((error) => {
        let { message } = error;
        dispatch(showNotification(MESSAGE_TYPE_ERROR, message));
    });
}
export function promptError(message) {
    return showNotification(MESSAGE_TYPE_ERROR, message);
}
export function promptSuccess(message) {
    return showNotification(MESSAGE_TYPE_SUCCESS, message);
}
export function incrementProgress(documentId, progress) {
    return {
        type: DOCUMENT_UPLOAD_IN_PROGRESS,
        documentId,
        progress
    };
}
export function isBusy(status) {
    return {
        type: IS_BUSY,
        status
    };
}
