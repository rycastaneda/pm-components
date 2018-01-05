
import axios from 'axios';
import normalize from 'json-api-normalizer';
import  build  from 'redux-object';
import {
    parseDataFromFetchTemplate,
    parseDataForCreateTemplate,
    parseDataForUpdateTemplate,
    parseDataForCreateCriteria,
    parseDataForUpdateCriteria,
    parseDataForDeleteCriteria,
    parseDataForCreateQuestion,
    createCriterionFromData,
    parseDataFromCreateQuestion,
    parseDataForUpdateQuestion,
    parseDataForScaleDefinition,
    parseInitialData
} from '../utils/dataParserUtil';
import {
    INITIALIZED,
    TEMPLATE_CREATED,
    TEMPLATE_UPDATED,
    TEMPLATE_FETCHED,
    CRITERIA_ADD,
    CRITERIA_DELETE,
    CRITERIA_UPDATE,
    MINIMISE_ALL_CRITERIA,
    CRITERIA_MAXIMISE_CHANGE,
    DOCUMENT_UPLOAD_SUCCESS,
    DOCUMENT_UPLOAD_FAILED,
    DOCUMENT_UPLOAD_IN_PROGRESS,
    DOCUMENTS_UPLOADING,
    DOCUMENT_DELETE,
    MINIMISE_ALL_QUESTIONS,
    QUESTION_ADD,
    QUESTION_UPDATE,
    QUESTION_DELETE,
    QUESTION_MAXIMISE_CHANGE
} from '../constants/ActionTypes';

import { MESSAGE_TYPE_ERROR } from '../notification/constants';
import { showNotification } from '../notification/actions';
import { showModal } from '../modal/actions';

const TEMPLATE_SERVICE_URL = 'evaluation-templates';
export const EVALUATION_TEMPLATE_LIST_PAGE ='/searcher/evaluation_templates/list';
export function publishTemplate() {
    return (dispatch, getState) => {
        const templateId = getState().evaluationTemplateCreator.id;
        return axios.post(TEMPLATE_SERVICE_URL+'/'+templateId+'/finalise', {})
        .then(() => {
            const title = 'Template Published';
            const comment = 'Your Template has been successfully published.';
            dispatch(showModal(title, comment, () => {
                window.location.href = EVALUATION_TEMPLATE_LIST_PAGE;
            }));
        })
        .catch((error) => {
            if (error.status_code===422) {
                dispatch(showNotification(MESSAGE_TYPE_ERROR, 'Data entered is invalid.'));
            } else {
                error.response.data.errors.forEach((e) => {
                    let { detail } = e;
                    dispatch(showNotification(MESSAGE_TYPE_ERROR, detail));
                });
            }

        });
    };
}
export function minimiseAllQuestions() {
    return { type:MINIMISE_ALL_QUESTIONS };
}
export function minimiseAllCriteria() {
    return { type:MINIMISE_ALL_CRITERIA };
}
export function toggleMaximiseQuestion(id, isMaximised) {
    return { type:QUESTION_MAXIMISE_CHANGE, id, isMaximised };
}

export function toggleMaximiseCriteria(id, isMaximised) {
    return { type:CRITERIA_MAXIMISE_CHANGE, id, isMaximised };
}

export function initialize() {
    return (dispatch) => {
        return axios.get('evaluation-question-types')
        .then((response) => {
            let questionTypes = parseInitialData(response.data);
            if (questionTypes.length) {
                dispatch({ type:INITIALIZED, questionTypes });
            } else {
                const message = 'Unable to proceed. Initial data returned by the service is empty';
                dispatch(showNotification(MESSAGE_TYPE_ERROR, message));
            }

        })
        .catch(() => {
            dispatch(showNotification(MESSAGE_TYPE_ERROR, 'Unable to recieve data.'));
        });
    };
}
export function addTemplate(title) {
    return (dispatch) => {
        const data = parseDataForCreateTemplate(title);
        return axios.post(TEMPLATE_SERVICE_URL, data)
        .then((response) => {
            const template = response.data.data;
            dispatch({ type:TEMPLATE_CREATED,
                    title: template.attributes.title,
                    id:Number(template.id)
                });
        })
        .catch((error) => {
            if (error.status_code===422) {
                dispatch(showNotification(MESSAGE_TYPE_ERROR, 'Data entered is invalid.'));
            } else {
                error.response.data.errors.forEach((e) => {
                    let { detail } = e;
                    dispatch(showNotification(MESSAGE_TYPE_ERROR, detail));
                });
            }
        });
    };
}

export function updateTemplate(title, templateId) {
    return (dispatch) => {
        const data = parseDataForUpdateTemplate(title, templateId);
        let serviceUrl = TEMPLATE_SERVICE_URL;
        serviceUrl += '/'+templateId;
        return axios.patch(serviceUrl, data)
        .then(() => {
            dispatch({ type:TEMPLATE_UPDATED, title });
        })
        .catch((error) => {
            if (error.status_code===422) {
                dispatch(showNotification(MESSAGE_TYPE_ERROR, 'Data entered is invalid.'));
            } else {
                error.response.data.errors.forEach((e) => {
                    let { detail } = e;
                    dispatch(showNotification(MESSAGE_TYPE_ERROR, detail));
                });
            }
        });
    };
}

export function addCriteria(title, weight) {
    return (dispatch, getState) => {
        const { evaluationTemplateCreator } =getState();
        const templateId = evaluationTemplateCreator.id;
        const data = parseDataForCreateCriteria(title, weight);
        let serviceUrl = TEMPLATE_SERVICE_URL;
        serviceUrl += '/'+templateId;
        serviceUrl += '/criteria';

        return axios.post(serviceUrl, data)
        .then((response) => {
            dispatch({ type:CRITERIA_ADD, criterion: createCriterionFromData(response.data) });
        })
        .catch((error) => {
            if (error.status_code===422) {
                dispatch(showNotification(MESSAGE_TYPE_ERROR, 'Data entered is invalid.'));
            } else {
                error.response.data.errors.forEach((e) => {
                    let { detail } = e;
                    dispatch(showNotification(MESSAGE_TYPE_ERROR, detail));
                });
            }
        });
    };
}

export function deleteCriteria(id) {
    return (dispatch, getState) => {
        const { evaluationTemplateCreator } =getState();
        const templateId = evaluationTemplateCreator.id;
        const data = parseDataForDeleteCriteria(id);
        let serviceUrl = TEMPLATE_SERVICE_URL;
        serviceUrl += '/'+templateId;
        serviceUrl += '/criteria/'+id;
        return axios.delete(serviceUrl, data)
        .then(() => {
            dispatch({ type:CRITERIA_DELETE, id });
        })
        .catch((error) => {
            if (error.status_code===422) {
                dispatch(showNotification(MESSAGE_TYPE_ERROR, 'Invalid operation'));
            } else {
                error.response.data.errors.forEach((e) => {
                    let { detail } = e;
                    dispatch(showNotification(MESSAGE_TYPE_ERROR, detail));
                });
            }
        });
    };
}

export function updateCriteria(id, title, weight) {
    return (dispatch, getState) => {
        const { evaluationTemplateCreator } =getState();
        const templateId = evaluationTemplateCreator.id;
        const data = parseDataForUpdateCriteria(id, title, weight);
        let serviceUrl = TEMPLATE_SERVICE_URL;
        serviceUrl += '/'+templateId;
        serviceUrl += '/criteria/'+id;
        return axios.patch(serviceUrl, data)
        .then(() => {
            dispatch({ type:CRITERIA_UPDATE, id, title, weight });
        })
        .catch((error) => {
            if (error.status_code===422) {
                dispatch(showNotification(MESSAGE_TYPE_ERROR, 'Data entered is invalid.'));
            } else {
                error.response.data.errors.forEach((e) => {
                    let { detail } = e;
                    dispatch(showNotification(MESSAGE_TYPE_ERROR, detail));
                });
            }
        });
    };
}

export function addQuestionToCriteria(criteriaId, questionTitle, questionType) {
    return (dispatch, getState) => {
        const { evaluationTemplateCreator } =getState();
        const templateId = evaluationTemplateCreator.id;
        const data = parseDataForCreateQuestion(questionTitle, questionType);
        let serviceUrl = TEMPLATE_SERVICE_URL;
        serviceUrl += '/'+templateId;
        serviceUrl += '/criteria/'+criteriaId;
        serviceUrl += '/questions';
        return axios.post(serviceUrl, data)
        .then((response) => {
            const question = parseDataFromCreateQuestion(response.data) ;
            dispatch({ type:QUESTION_ADD, criteriaId, question });
        })
        .catch((error) => {
            if (error.status_code===422) {
                dispatch(showNotification(MESSAGE_TYPE_ERROR, 'Data entered is invalid.'));
            } else {
                error.response.data.errors.forEach((e) => {
                    let { detail } = e;
                    dispatch(showNotification(MESSAGE_TYPE_ERROR, detail));
                });
            }
        });
    };
}

export function onQuestionTypeChange(criteriaId, questionId, type) {
    return (dispatch, getState) => {
        const { evaluationTemplateCreator } =getState();
        const templateId = evaluationTemplateCreator.id;
        let question = evaluationTemplateCreator.questionsByIndex[questionId];
        question = { ...question, type };
        let data = parseDataForUpdateQuestion(question);

        let serviceUrl = TEMPLATE_SERVICE_URL;
        serviceUrl += '/'+templateId;
        serviceUrl += '/criteria/'+criteriaId;
        serviceUrl += '/questions/'+questionId;

        return axios.patch(serviceUrl, data)
        .then((response) => {
            const question = parseDataFromCreateQuestion(response.data) ;
            dispatch({ type:QUESTION_UPDATE, criteriaId, question });
        })
        .catch((error) => {
            if (error.status_code===422) {
                dispatch(showNotification(MESSAGE_TYPE_ERROR, 'Data entered is invalid.'));
            } else {
                error.response.data.errors.forEach((e) => {
                    let { detail } = e;
                    dispatch(showNotification(MESSAGE_TYPE_ERROR, detail));
                });
            }
        });
    };
}
export function onQuestionTitleChange(criteriaId, questionId, title) {
    return (dispatch, getState) => {

        const { evaluationTemplateCreator } =getState();
        const templateId = evaluationTemplateCreator.id;

        let question = evaluationTemplateCreator.questionsByIndex[questionId];
        question = { ...question, title };
        let data = parseDataForUpdateQuestion(question);

        let serviceUrl = TEMPLATE_SERVICE_URL;
        serviceUrl += '/'+templateId;
        serviceUrl += '/criteria/'+criteriaId;
        serviceUrl += '/questions/'+questionId;

        return axios.patch(serviceUrl, data)
        .then(() => {
            dispatch({ type:QUESTION_UPDATE, criteriaId, question });
        })
        .catch((error) => {
            if (error.status_code===422) {
                dispatch(showNotification(MESSAGE_TYPE_ERROR, 'Data entered is invalid.'));
            } else {
                error.response.data.errors.forEach((e) => {
                    let { detail } = e;
                    dispatch(showNotification(MESSAGE_TYPE_ERROR, detail));
                });
            }
        });
    };
}

export function onQuestionAllowUploadChange(criteriaId, questionId, isAllowUpload) {
    return (dispatch, getState) => {

        const { evaluationTemplateCreator } =getState();
        const templateId = evaluationTemplateCreator.id;

        let question = evaluationTemplateCreator.questionsByIndex[questionId];
        question = { ...question, isAllowUpload };

        const data = parseDataForUpdateQuestion(question);

        let serviceUrl = TEMPLATE_SERVICE_URL;
        serviceUrl += '/'+templateId;
        serviceUrl += '/criteria/'+criteriaId;
        serviceUrl += '/questions/'+questionId;

        return axios.patch(serviceUrl, data)
        .then(() => {
            dispatch({ type:QUESTION_UPDATE, criteriaId, question });
        })
        .catch((error) => {
            if (error.status_code===422) {
                dispatch(showNotification(MESSAGE_TYPE_ERROR, 'Data entered is invalid.'));
            } else {
                error.response.data.errors.forEach((e) => {
                    let { detail } = e;
                    dispatch(showNotification(MESSAGE_TYPE_ERROR, detail));
                });
            }
        });
    };
}

export function  onAllowScaleDefinitionChange(criteriaId, questionId, isAllowScaleDefinitions) {
    return (dispatch, getState) => {
        const { evaluationTemplateCreator } =getState();
        const templateId = evaluationTemplateCreator.id;

        let question = evaluationTemplateCreator.questionsByIndex[questionId];
        question = { ...question, isAllowScaleDefinitions };

        const data = parseDataForUpdateQuestion(question);

        let serviceUrl = TEMPLATE_SERVICE_URL;
        serviceUrl += '/'+templateId;
        serviceUrl += '/criteria/'+criteriaId;
        serviceUrl += '/questions/'+questionId;

        return axios.patch(serviceUrl, data)
        .then(() => {
            dispatch({ type:QUESTION_UPDATE, criteriaId, question });
        })
        .catch((error) => {
            if (error.status_code===422) {
                dispatch(showNotification(MESSAGE_TYPE_ERROR, 'Data entered is invalid.'));
            } else {
                error.response.data.errors.forEach((e) => {
                    let { detail } = e;
                    dispatch(showNotification(MESSAGE_TYPE_ERROR, detail));
                });
            }
        });
    };
}

export function onQuestionAllowCommentsChange(criteriaId, questionId, isCommentRequired) {
    return (dispatch, getState) => {
        const { evaluationTemplateCreator } =getState();
        const templateId = evaluationTemplateCreator.id;

        let question = evaluationTemplateCreator.questionsByIndex[questionId];
        question = { ...question, isCommentRequired };

        let serviceUrl = TEMPLATE_SERVICE_URL;
        serviceUrl += '/'+templateId;
        serviceUrl += '/criteria/'+criteriaId;
        serviceUrl += '/questions/'+questionId;

        const data = parseDataForUpdateQuestion(question);

        return axios.patch(serviceUrl, data)
        .then(() => {
            dispatch({ type:QUESTION_UPDATE, criteriaId, question });
        })
        .catch((error) => {
            let message;
            if (Array.isArray(error.response.data.errors)) {
                message = error.response.data.errors[0].detail;
            } else {
                message = error.response.data.errors.detail;
            }

            dispatch(showNotification(MESSAGE_TYPE_ERROR, message));
        });
    };
}

export function deleteQuestion(criteriaId, questionId) {
    return (dispatch, getState) => {
        const templateId = getState().evaluationTemplateCreator.id;

        let serviceUrl = TEMPLATE_SERVICE_URL;
        serviceUrl += '/'+templateId;
        serviceUrl += '/criteria/'+criteriaId;
        serviceUrl += '/questions/'+questionId;

        return axios.delete(serviceUrl)
        .then(() => {
            dispatch({ type:QUESTION_DELETE, criteriaId, questionId });
        })
        .catch((error) => {
            let message;
            if (Array.isArray(error.response.data.errors)) {
                message = error.response.data.errors[0].detail;
            } else {
                message = error.response.data.errors.detail;
            }

            dispatch(showNotification(MESSAGE_TYPE_ERROR, message));
        });
    };
}

export function onScaleDefinitionChange(criteriaId, questionId, typeDefinitionId, text, score, scaleDefinitionId) {
    return (dispatch, getState) => {

        const templateId = getState().evaluationTemplateCreator.id;
        let serviceUrl = TEMPLATE_SERVICE_URL;
        serviceUrl += '/'+templateId;
        serviceUrl += '/criteria/'+criteriaId;
        serviceUrl += '/questions/'+questionId;
        serviceUrl += '/scale-definitions';
        const data = parseDataForScaleDefinition(typeDefinitionId, scaleDefinitionId, text, score);
        let question = { ...getState().evaluationTemplateCreator.questionsByIndex[questionId] };
        let promise;
        if (scaleDefinitionId === undefined) {

            promise = axios.post(serviceUrl, data)
                .then((response) => {
                    let responseScaleDef = normalize(response.data, { endpoint:'evaluation-question-scale-definitions' });
                    responseScaleDef = build(responseScaleDef, 'evaluationQuestionScaleDefinitions')[0];
                    question.scaleDefinitions = question.scaleDefinitions.map((item) => {
                        if (item.id === responseScaleDef.typeDefinition.id) {
                            let label = text;
                            let definitionId = response.data.data.id;
                            return { ...item, label, definitionId };
                        } else {
                            return item;
                        }
                    });
                    dispatch({ type:QUESTION_UPDATE, criteriaId, question });
                });

        } else {
            serviceUrl +=('/'+scaleDefinitionId);
            if (text) {
                promise = axios.patch(serviceUrl, data)
                    .then((response) => {
                        let responseScaleDef = normalize(response.data, { endpoint:'evaluation-question-scale-definitions' });
                        responseScaleDef = build(responseScaleDef, 'evaluationQuestionScaleDefinitions')[0];

                        question.scaleDefinitions = question.scaleDefinitions.map((item) => {
                            if (item.id === responseScaleDef.typeDefinition.id) {
                                let label = text;
                                return { ...item, label };
                            } else {
                                return item;
                            }
                        });
                        dispatch({ type:QUESTION_UPDATE, criteriaId, question });
                    });

            } else {
                promise = axios.delete(serviceUrl)
                    .then(() => {
                        question.scaleDefinitions = question.scaleDefinitions.map((item) => {
                            if (item.definitionId === scaleDefinitionId) {
                                let { id, title, value } = item;
                                return { id, title, value };
                            } else {
                                return item;
                            }
                        });
                        dispatch({ type:QUESTION_UPDATE, criteriaId, question });
                    });
            }
        }
        promise.catch((error) => {
            let message;
            if (Array.isArray(error.response.data.errors)) {
                message = error.response.data.errors[0].detail;
            } else {
                message = error.response.data.errors.detail;
            }

            dispatch(showNotification(MESSAGE_TYPE_ERROR, message));
        });
        return promise;
    };
}

export function addDocumentsForQuestion(criteriaId, questionId, documents) {
    return (dispatch, getState) => {

        const templateId = getState().evaluationTemplateCreator.id;

        dispatch({
            type: DOCUMENTS_UPLOADING,
            questionId,
            documents
        });

        let serviceUrl =TEMPLATE_SERVICE_URL;
        serviceUrl += '/'+templateId;
        serviceUrl += '/criteria/'+criteriaId;
        serviceUrl += '/questions/'+questionId;
        serviceUrl += '/documents';

        return  axios.all(
                documents.map((document) => {
                    let formData = new FormData();
                    formData.append('template_id', templateId);
                    formData.append('criteria_id', criteriaId);
                    formData.append('question_id', questionId);
                    formData.append('document', document);

                    return axios.post(serviceUrl, formData, {
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
                })
            ).then((response) => {
                if (!response.every(response => response.status === 200)) {
                    dispatch(showNotification(MESSAGE_TYPE_ERROR, 'Error in uploading the document.'));
                }
            });
    };
}

export function deleteDocument(criteriaId, questionId, id) {
    return (dispatch, getState) => {

        const templateId = getState().evaluationTemplateCreator.id;
        const reffId = getState().evaluationTemplateCreator.documentsByIndex[id].referenceId;

        let serviceUrl = TEMPLATE_SERVICE_URL;
        serviceUrl+='/'+templateId;
        serviceUrl+='/criteria/'+criteriaId;
        serviceUrl+='/questions/'+questionId;
        serviceUrl+='/documents/'+reffId;

        return axios.delete(serviceUrl)
        .then(() => {
            dispatch({ type:DOCUMENT_DELETE, questionId, id });
        })
        .catch((error) => {
            let message;
            if (Array.isArray(error.response.data.errors)) {
                message = error.response.data.errors[0].detail;
            } else {
                message = error.response.data.errors.detail;
            }

            dispatch(showNotification(MESSAGE_TYPE_ERROR, message));
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

export function fetchTemplate(id) {
    return (dispatch) => {
        axios.all([
            axios.get('evaluation-question-types')
            .then((response) => {
                let questionTypes = parseInitialData(response.data);
                if (questionTypes.length) {
                    dispatch({ type:INITIALIZED, questionTypes });
                } else {
                    const message = 'Unable to proceed. Initial data returned by the service is empty';
                    dispatch(showNotification(MESSAGE_TYPE_ERROR, message));
                }

            })
            .catch((error) => {
                let message;
                if (Array.isArray(error.response.data.errors)) {
                    message = error.response.data.errors[0].detail;
                } else {
                    message = error.response.data.errors.detail;
                }

                dispatch(showNotification(MESSAGE_TYPE_ERROR, message));
            }),
            getPromiseForService(TEMPLATE_SERVICE_URL+'/'+id+'?include=criteria.questions', dispatch)
            .then((response) => {
                const template = parseDataFromFetchTemplate(response.data);
                dispatch ({ type: TEMPLATE_FETCHED, template });
            })
        ]);
    };
}

function getPromiseForService(url, dispatch) {
    return axios.get(url)
    .catch((error) => {
        let { message } = error;
        if (!message) {
            if (Array.isArray(error.response.data.errors)) {
                message = error.response.data.errors[0].details;
            } else {

                message = error.response.data.errors.details;
            }
        }
        dispatch(showNotification(MESSAGE_TYPE_ERROR, message));
    });
}
