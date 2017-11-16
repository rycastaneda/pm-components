import { } from '../constants/ActionTypes';
import axios from 'axios';
import { parseDataForCreateTemplate,
    parseDataForUpdateTemplate,
    parseDataForCreateCriteria,
    parseDataForUpdateCriteria,
    parseDataForDeleteCriteria,
    parseDataForCreateQuestion,
    createCriterionFromData,
    parseDataFromCreateQuestion,
    parseInitialData
} from '../utils/dataParserUtil';
import {
    INITIALIZED,
    CRITERIA_ADD,
    CRITERIA_DELETE,
    CRITERIA_UPDATE,
    DOCUMENT_UPLOAD_SUCCESS,
    DOCUMENT_UPLOAD_FAILED,
    DOCUMENT_UPLOAD_IN_PROGRESS,
    DOCUMENTS_UPLOADING,
    QUESTION_ADD,
    QUESTION_UPDATE,
    QUESTION_DELETE,
    TEMPLATE_FETCHED,
    TEMPLATE_CREATED,
    TEMPLATE_UPDATED,
    REQUEST_FAILED,
    IS_BUSY
} from '../constants/ActionTypes';

const TEMPLATE_SERVICE_URL = 'evaluation-templates';
export function initialize() {
    return (dispatch) => {
        return axios.get('evaluation-question-types')
        .then((response) => {
            let questionTypes =parseInitialData(response.data.data);
            dispatch({ type:INITIALIZED, questionTypes });
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}
export function addTemplate(title) {
    return (dispatch) => {
        return axios.post(TEMPLATE_SERVICE_URL, parseDataForCreateTemplate(title))
        .then((response) => {
            const template = response.data.data;
            dispatch({ type:TEMPLATE_CREATED, title: template.attributes.title, id:Number(template.id) });
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}

export function updateTemplate(title, id) {
    return (dispatch) => {
        return axios.patch(TEMPLATE_SERVICE_URL+'/'+id, parseDataForUpdateTemplate(title, id))
        .then(() => {
            dispatch({ type:TEMPLATE_UPDATED, title });
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}
export function addCriteria(title, weight) {
    return (dispatch, getState) => {
        const id = getState().evaluationTemplateCreator.id;
        return axios.post(TEMPLATE_SERVICE_URL+'/'+id+'/criteria', parseDataForCreateCriteria(title, weight))
        .then((response) => {
            dispatch({ type:CRITERIA_ADD, criterion: createCriterionFromData(response.data.data) });
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}

export function deleteCriteria(id) {
    return (dispatch, getState) => {
        const templateId = getState().evaluationTemplateCreator.id;
        return axios.patch(TEMPLATE_SERVICE_URL+'/'+templateId+'/criteria/'+id, parseDataForDeleteCriteria(id))
        .then(() => {
            dispatch({ type:CRITERIA_DELETE, id });
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}

export function updateCriteria(id, title, weight) {
    return (dispatch, getState) => {
        const templateId = getState().evaluationTemplateCreator.id;
        return axios.patch(TEMPLATE_SERVICE_URL+'/'+templateId+'/criteria/'+id, parseDataForUpdateCriteria(id, title, weight))
        .then(() => {
            dispatch({ type:CRITERIA_UPDATE, id, title, weight });
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}

export function addQuestionToCriteria(criteriaId, questionTitle, questionType) {
    return (dispatch, getState) => {
        const id = getState().evaluationTemplateCreator.id;
        return axios.post(TEMPLATE_SERVICE_URL+'/'+id+'/criteria/'+criteriaId+'/questions', parseDataForCreateQuestion(questionTitle, questionType))
        .then((response) => {
            const question = parseDataFromCreateQuestion(response.data.data, questionType) ;
            dispatch({ type:QUESTION_ADD, criteriaId, question });
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}

export function updateQuestion() {
    return { type:QUESTION_UPDATE };
}

export function deleteQuestion() {
    return { type:QUESTION_DELETE };
}

export function addDocumentsForQuestion(criteriaId, questionId, documents) {
    return (dispatch, getState) => {
        const templateId = getState().evaluationTemplateCreator.id;
        dispatch({
            type: DOCUMENTS_UPLOADING,
            questionId,
            documents
        });
        const url =TEMPLATE_SERVICE_URL+'/'+templateId+'/criteria/'+criteriaId+'/questions/'+questionId+'/documents';
        return     axios.all(
                documents.map((document) => {
                    let formData = new FormData();

                    formData.append('template_id', templateId);
                    formData.append('criteria_id', criteriaId);
                    formData.append('question_id', questionId);
                    formData.append('document', document);

                    return axios.post(url, formData, {
                        onUploadProgress: function(progressEvent) {
                            var percentCompleted = progressEvent.loaded / progressEvent.total;

                            dispatch(incrementProgress(document.id, Math.ceil(percentCompleted * 100)));
                        }
                    }).then((response) => {


                        dispatch({
                            type: DOCUMENT_UPLOAD_SUCCESS,
                            criteriaId,
                            questionId,
                            documentId: document.id,
                            newDocumentId: response.data.data.id
                        });
                        return response;
                    }).catch((error) => {
                        dispatch({
                            type: DOCUMENT_UPLOAD_FAILED,
                            documentId: document.id
                        });
                        return error;
                    });
                })
            ).then((response) => {
                if (!response.every(response => response.status === 200)) { // Respond to error if necessary
                    dispatch({
                        type: REQUEST_FAILED
                    });
                }
            });
    };
}
export function incrementProgress(documentId, progress) {
    return {
        type: DOCUMENT_UPLOAD_IN_PROGRESS,
        documentId,
        progress
    };
}
export function fetchTemplate() {
    return (dispatch) => {
        getPromiseForService(TEMPLATE_SERVICE_URL, dispatch)
            .then((response) => {
                response;
                // let template = parseTemplateFromResponse(response.data);
                dispatch ({ type: TEMPLATE_FETCHED });
            });
    };
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
