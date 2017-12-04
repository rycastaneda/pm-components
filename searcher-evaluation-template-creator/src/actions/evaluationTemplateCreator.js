import { } from '../constants/ActionTypes';
import axios from 'axios';
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
    TEMPLATE_FETCHED,
    CRITERIA_ADD,
    CRITERIA_DELETE,
    CRITERIA_UPDATE,
    CRITERIA_MAXIMISE_CHANGE,
    DOCUMENT_UPLOAD_SUCCESS,
    DOCUMENT_UPLOAD_FAILED,
    DOCUMENT_UPLOAD_IN_PROGRESS,
    DOCUMENTS_UPLOADING,
    DOCUMENT_DELETE,
    QUESTION_ADD,
    QUESTION_UPDATE,
    QUESTION_DELETE,
    QUESTION_MAXIMISE_CHANGE,
    TEMPLATE_CREATED,
    TEMPLATE_UPDATED,
    REQUEST_FAILED,
    IS_BUSY
} from '../constants/ActionTypes';

const TEMPLATE_SERVICE_URL = 'evaluation-templates';
export function publishTemplate() {
    return (dispatch, getState) => {
        const templateId = getState().evaluationTemplateCreator.id;
        return axios.post(TEMPLATE_SERVICE_URL+'/'+templateId+'/finalise', {})
        .then(() => {
            alert('Template Published.');
        })
        .catch((error) => {
            // dispatch({ type:REQUEST_FAILED, message: error.message });
            error.response.data.errors.forEach((e) => {
                alert(e.detail);
            });

        });
    };
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
            let questionTypes = parseInitialData(response.data.data);
            if (questionTypes.length) {
                dispatch({ type:INITIALIZED, questionTypes });
            } else {
                alert('Unable to proceed. Initial data returned by the service is empty');
            }

        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}
export function addTemplate(title) {
    return (dispatch) => {
        const data = parseDataForCreateTemplate(title);
        return axios.post(TEMPLATE_SERVICE_URL, data)
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
        const data = parseDataForUpdateTemplate(title, id);
        return axios.patch(TEMPLATE_SERVICE_URL+'/'+id, data)
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
        const { id } = getState().evaluationTemplateCreator;
        const data = parseDataForCreateCriteria(title, weight);
        return axios.post(TEMPLATE_SERVICE_URL+'/'+id+'/criteria', data)
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
        const data = parseDataForDeleteCriteria(id);

        return axios.delete(TEMPLATE_SERVICE_URL+'/'+templateId+'/criteria/'+id, data)
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
        const data = parseDataForUpdateCriteria(id, title, weight);
        return axios.patch(TEMPLATE_SERVICE_URL+'/'+templateId+'/criteria/'+id,
        data)
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
        const data = parseDataForCreateQuestion(questionTitle, questionType);
        return axios.post(TEMPLATE_SERVICE_URL+'/'+id+'/criteria/'+criteriaId+'/questions',
        data)
        .then((response) => {
            const question = parseDataFromCreateQuestion(response.data) ;
            dispatch({ type:QUESTION_ADD, criteriaId, question });
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}

export function onQuestionTypeChange(criteriaId, questionId, type) {
    return (dispatch, getState) => {
        let templateId =getState().evaluationTemplateCreator.id;
        let question = getState().evaluationTemplateCreator.questionsByIndex[questionId];
        let data = parseDataForUpdateQuestion(Object.assign({}, question, { type }));
        return axios.patch(TEMPLATE_SERVICE_URL+'/'+templateId+'/criteria/'+criteriaId+'/questions/'+questionId, data)
        .then((response) => {
            const question = parseDataFromCreateQuestion(response.data) ;
            dispatch({ type:QUESTION_UPDATE, criteriaId, question });
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}
export function onQuestionTitleChange(criteriaId, questionId, title) {
    return (dispatch, getState) => {
        let templateId =getState().evaluationTemplateCreator.id;
        let qn = getState().evaluationTemplateCreator.questionsByIndex[questionId];
        let data = parseDataForUpdateQuestion(Object.assign({}, qn, { title }));
        return axios.patch(TEMPLATE_SERVICE_URL+'/'+templateId+'/criteria/'+criteriaId+'/questions/'+questionId, data)
        .then(() => {
            qn = getState().evaluationTemplateCreator.questionsByIndex[questionId];
            const question = Object.assign({}, qn, { title });
            dispatch({ type:QUESTION_UPDATE, criteriaId, question });
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}

export function onQuestionAllowUploadChange(criteriaId, questionId, isAllowUpload) {
    return (dispatch, getState) => {
        let templateId =getState().evaluationTemplateCreator.id;
        let question = getState().evaluationTemplateCreator.questionsByIndex[questionId];
        let data = parseDataForUpdateQuestion(Object.assign({}, question, { isAllowUpload }));
        return axios.patch(TEMPLATE_SERVICE_URL+'/'+templateId+'/criteria/'+criteriaId+'/questions/'+questionId, data)
        .then(() => {

            dispatch({ type:QUESTION_UPDATE, criteriaId, question });
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}
export function  onAllowScaleDefinitionChange(criteriaId, questionId, isAllowScaleDefinitions) {
    return (dispatch, getState) => {
        let templateId =getState().evaluationTemplateCreator.id;
        let question = getState().evaluationTemplateCreator.questionsByIndex[questionId];
        let data = parseDataForUpdateQuestion(Object.assign({}, question, { isAllowScaleDefinitions }));
        return axios.patch(TEMPLATE_SERVICE_URL+'/'+templateId+'/criteria/'+criteriaId+'/questions/'+questionId, data)
        .then((response) => {
            const question = parseDataFromCreateQuestion(response.data);

            dispatch({ type:QUESTION_UPDATE, criteriaId, question });
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}
export function onQuestionAllowCommentsChange(criteriaId, questionId, isCommentRequired) {
    return (dispatch, getState) => {
        let templateId =getState().evaluationTemplateCreator.id;
        let question = getState().evaluationTemplateCreator.questionsByIndex[questionId];
        let data = parseDataForUpdateQuestion(Object.assign({}, question, { isCommentRequired }));
        return axios.patch(TEMPLATE_SERVICE_URL+'/'+templateId+'/criteria/'+criteriaId+'/questions/'+questionId, data)
        .then(() => {
            dispatch({ type:QUESTION_UPDATE, criteriaId, question });
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}
export function deleteQuestion(criteriaId, questionId) {
    return (dispatch, getState) => {
        const templateId = getState().evaluationTemplateCreator.id;
        return axios.delete(TEMPLATE_SERVICE_URL+'/'+templateId+'/criteria/'+criteriaId+'/questions/'+questionId)
        .then(() => {
            dispatch({ type:QUESTION_DELETE, criteriaId, questionId });
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}
export function onScaleDefinitionChange(criteriaId, questionId, scaleDefinitionId, text, score, refId) {
    return (dispatch, getState) => {
        const templateId = getState().evaluationTemplateCreator.id;
        const url =TEMPLATE_SERVICE_URL+'/'+templateId+'/criteria/'+criteriaId+'/questions/'+questionId+'/scale-definitions';

        let data = parseDataForScaleDefinition(scaleDefinitionId, text, score);

        if (refId===null) {
            return axios.post(url, data)
                .then((response) => {
                    response;
                    let question = Object.assign({}, getState().evaluationTemplateCreator.questionsByIndex[questionId]);
                    const index = question.scaleDefinitions.findIndex((item) => {
                        return (item.id === response.data.data.attributes.score);
                    });
                    question.scaleDefinitions[index].refId = response.data.data.id;
                    question.scaleDefinitions[index].label = text;
                    dispatch({ type:QUESTION_UPDATE, criteriaId, question });
                })
                .catch((error) => {
                    dispatch({ type:REQUEST_FAILED, message: error.message });
                });
        } else {

            // not working completely. Need to check with Tom
            return axios.patch(url+'/'+refId, data)
                .then((response) => {

                    let question = Object.assign({}, getState().evaluationTemplateCreator.questionsByIndex[questionId]);

                    const index = question.scaleDefinitions.findIndex((item) => {
                        return (item.id === response.data.data.id);
                    });

                    question.scaleDefinitions[index].label = text;
                    dispatch({ type:QUESTION_UPDATE, criteriaId, question });
                })
                .catch((error) => {
                    dispatch({ type:REQUEST_FAILED, message: error.message });
                });
        }
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
        const url =TEMPLATE_SERVICE_URL+'/'+templateId+'/criteria/'+criteriaId+'/questions/'+questionId+'/documents';
        return  axios.all(
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
                if (!response.every(response => response.status === 200)) { // Respond to error if necessary
                    dispatch({
                        type: REQUEST_FAILED
                    });
                }
            });
    };
}
export function deleteDocument(criteriaId, questionId, id) {
    return (dispatch, getState) => {
        const templateId = getState().evaluationTemplateCreator.id;
        const reffId = getState().evaluationTemplateCreator.documentsByIndex[id].referenceId;
        return axios.delete(TEMPLATE_SERVICE_URL+'/'+templateId+'/criteria/'+criteriaId+'/questions/'+questionId+'/documents/'+reffId)
        .then(() => {
            dispatch({ type:DOCUMENT_DELETE, questionId, id });
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
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
                let questionTypes = parseInitialData(response.data.data);
                if (questionTypes.length) {
                    dispatch({ type:INITIALIZED, questionTypes });
                } else {
                    alert('Unable to proceed. Initial data returned by the service is empty');
                }

            })
            .catch((error) => {
                dispatch({ type:REQUEST_FAILED, message: error.message });
            }),
            getPromiseForService(TEMPLATE_SERVICE_URL+'/'+id+'?include=criteria.questions', dispatch)
            .then((response) => {
                let template = parseDataFromFetchTemplate(response.data);
                dispatch ({ type: TEMPLATE_FETCHED, template });
            })
        ]
        );

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
