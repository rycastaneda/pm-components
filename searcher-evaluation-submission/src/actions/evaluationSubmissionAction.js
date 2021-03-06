import axios from 'axios';
import { parseInitialize, parseDataForUpdateQuestion } from '../utils/dataParser';
import { COMMENT_MANDATORY,
        VALIDATION_COMMENT_MANDATORY,
        SUBMISSION_MESSAGE_TITLE,
        SUBMISSION_MESSAGE_CONTENT,
        ASSIGNMENT_BUTTON_LABEL,
        VALIDATION_MESSAGE_ASSIGNMENT_SUBMITTED } from '../constants';
import { UPDATE_TEMPLATE_ASSIGNMENT,
    DOCUMENT_UPLOAD_SUCCESS,
    DOCUMENT_UPLOAD_FAILED,
    DOCUMENT_UPLOAD_IN_PROGRESS,
    DOCUMENTS_UPLOADING,
    DOCUMENT_DELETE,
    REQUEST_FAILED,
    QUESTION_UPDATED,
    CRITERIA_UPDATED,
    IS_BUSY } from '../constants/ActionTypes';
import { MESSAGE_TYPE_ERROR, MESSAGE_TYPE_SUCCESS } from '../notification/constants';
import { showNotification } from '../notification/actions';
import { showModal } from '../modal/actions';

const EVALUATION_ASSIGNMENT_LIST_PAGE = '/searcher/evaluation_assignments/list';

export function initialize(requestedAssignmentId) {
    return (dispatch) => {
        dispatch(isBusy(true));
        return axios.get('/evaluation-template-assignments/'+requestedAssignmentId+'?include=template.criteria.questions')
        .then((response) => {
            dispatch(isBusy(false));
            let result = parseInitialize(response.data, requestedAssignmentId);
            if (result.assignmentStatus.id==='3') {
                dispatch(promptError(VALIDATION_MESSAGE_ASSIGNMENT_SUBMITTED));
            }
            dispatch({ type:UPDATE_TEMPLATE_ASSIGNMENT, ...result });

        })
        .catch((error) => {
            dispatch(isBusy(false));
            if (error.response) {
                let { errors } = error.response.data;
                errors.forEach((er) => {
                    let message = er.detail;
                    dispatch(promptError(message));
                });
            } else {
                let { message } = error;
                dispatch(promptError(message));
            }
            dispatch({ type:REQUEST_FAILED });
        });
    };
}
export function uploadDocuments(questionId, documents) {
    return (dispatch, getState) => {
        let { evaluationSubmission } = getState();

        let { assignmentId } = evaluationSubmission;

        let question = evaluationSubmission.questionByIndex[questionId];
        // if comments are mandatory and if a defenition is selected then check if the user has entered a comment.
        let { mandatoryComments, comment, selectedDefinition } = question;
        if (Boolean(mandatoryComments)&&selectedDefinition!==null&&!comment.length) {
            dispatch(promptError(COMMENT_MANDATORY));
            return false;
        }
        dispatch({
            type: DOCUMENTS_UPLOADING,
            questionId,
            documents
        });
        if (question.responseId === null) {
            return updateQuestion(question, assignmentId, dispatch).then(() => {
                question = evaluationSubmission.questionByIndex[questionId];
                axios.all(buildUploadPromiseFromDocuments(question, documents, assignmentId, dispatch));
            });
        } else {
            return axios.all(buildUploadPromiseFromDocuments(question, documents, assignmentId, dispatch));
        }

    };
}
function buildUploadPromiseFromDocuments(question, documents, assignmentId, dispatch) {
    return documents.map((document) => {
        let questionId = question.id;
        let formData = new FormData();
        formData.append('document', document);
        formData.append('question_id', questionId);
        formData.append('assignment_id', assignmentId);
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
    });
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
        })
        .catch((error) => {

            if (error.response) {
                let { errors } = error.response.data;
                errors.forEach((er) => {
                    let message = er.detail;
                    dispatch(promptError(message));
                });
            } else {
                let { message } = error;
                dispatch(promptError(message));
            }
            dispatch({ type:REQUEST_FAILED });
        });
    };

}
export function submitAssignment() {
    return (dispatch, getState) => {
        dispatch(isBusy(true));
        let { evaluationSubmission } = getState();
        let { assignmentId, questionByIndex } = evaluationSubmission;
        let commentCount =0;
        Object.values(questionByIndex).forEach((question) => {
            let { mandatoryComments, comment, selectedDefinition } = question;
            // if comments are mandatory and if a defenition is selected then check if the user has entered a comment.
            if (Boolean(mandatoryComments)&&selectedDefinition!==null&&!comment.length) {
                commentCount++;
            }
        });
        if (commentCount) {
            dispatch(isBusy(false));
            dispatch(promptError(VALIDATION_COMMENT_MANDATORY));
            return false;
        }
        let endpoint = '/evaluation-template-assignments/'+assignmentId+'/submit';
        let promise = axios.post(endpoint);
        promise.then(() => {
            dispatch(isBusy(false));
            dispatch(showModal(SUBMISSION_MESSAGE_TITLE,
                 SUBMISSION_MESSAGE_CONTENT,
                 ASSIGNMENT_BUTTON_LABEL, () => {
                     window.location.href = EVALUATION_ASSIGNMENT_LIST_PAGE;
                 }));
        })
        .catch((error) => {
            dispatch(isBusy(false));
            if (error.response) {
                let { errors } = error.response.data;
                errors.forEach((er) => {
                    let message = er.detail;
                    dispatch(promptError(message));
                });
            } else {
                let { message } = error;
                dispatch(promptError(message));
            }
        });
    };
}
export function setOptionValue(questionId, scaleDefinitionId, value) {
    return (dispatch, getState) => {
        dispatch(isBusy(true));
        let { evaluationSubmission } = getState();
        let question = { ...evaluationSubmission.questionByIndex[questionId] };
        let { assignmentId } = evaluationSubmission;
        question.selectedDefinition = value;
        updateQuestion(question, assignmentId, dispatch);
    };
}
export function setComment(questionId, comment) {
    return (dispatch, getState) => {
        dispatch(isBusy(true));
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
    dispatch(isBusy(true));
    let parsedQuestionData = parseDataForUpdateQuestion(question);
    if (question.isAttempted) {
        promise = axios.patch(endpoint+'/'+question.responseId, parsedQuestionData);
    } else {
        promise = axios.post(endpoint, parsedQuestionData);
    }
    promise.then((response) => {
        if (!question.isAttempted) {
            question.isAttempted = true;
            question.responseId =  response.data.data.id;
        }
        dispatch({ type: QUESTION_UPDATED, question });
    }).catch((error) => {
        dispatch(isBusy(false));
        if (error.response) {
            let { errors } = error.response.data;
            errors.forEach((er) => {
                let message = er.detail;
                dispatch(promptError(message));
            });
        } else {
            let { message } = error;
            dispatch(promptError(message));
        }
    });
    return promise;
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
