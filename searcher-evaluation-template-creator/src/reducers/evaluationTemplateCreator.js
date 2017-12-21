import {
    INITIALIZED,
    TEMPLATE_FETCHED,
    TEMPLATE_CREATED,
    TEMPLATE_UPDATED,
    CRITERIA_ADD,
    CRITERIA_DELETE,
    CRITERIA_UPDATE,
    CRITERIA_MAXIMISE_CHANGE,
    QUESTION_ADD,
    QUESTION_DELETE,
    QUESTION_UPDATE,
    QUESTION_MAXIMISE_CHANGE,
    DOCUMENT_UPLOAD_SUCCESS,
    DOCUMENT_UPLOAD_FAILED,
    DOCUMENT_UPLOAD_IN_PROGRESS,
    DOCUMENTS_UPLOADING,
    DOCUMENT_DELETE,
    IS_BUSY

} from '../constants/ActionTypes';

import {
    UPLOAD_IN_PROGRESS,
    UPLOAD_SUCCESS,
    UPLOAD_FAILED

} from '../constants';

function getInitialData() {
    return {
        isBusy:false,
        messages:[],
        id:null,
        title:'',
        criteriaByIndex:{},
        allCriteriaIndexes:[],
        questionsByIndex:{},
        allQuestionIndexes:[],
        documentsByIndex:{},
        allDocumentIndexes:[],
        questionTypes:[]
    };
}

export function evaluationTemplateCreator(state = getInitialData(), action) {
    switch (action.type) {
        case INITIALIZED: {
            let { questionTypes } = action;
            return { ...state, questionTypes };

        }
        case QUESTION_MAXIMISE_CHANGE: {
            let { id, isMaximised } = action;
            let { questionsByIndex } = state;
            Object.values(questionsByIndex).forEach((item) => {
                item.isMaximised = false;
            });
            let question = questionsByIndex[id];
            questionsByIndex[id] = { ...question, isMaximised };
            return { ...state, questionsByIndex };
        }
        case CRITERIA_MAXIMISE_CHANGE: {
            let { id, isMaximised } = action;
            let { criteriaByIndex } = state;
            Object.values(criteriaByIndex).forEach((item) => {
                item.isMaximised = false;
            });
            let criteria = criteriaByIndex[id];
            criteriaByIndex[id] = { ...criteria, isMaximised };
            return { ...state, criteriaByIndex };
        }
        case TEMPLATE_FETCHED:
            {
                let { template } = action;
                let { id,
                    title,
                    criteriaByIndex,
                    allCriteriaIndexes,
                    questionsByIndex,
                    allQuestionIndexes,
                    documentsByIndex,
                    allDocumentIndexes } = template;
                return Object.assign({}, state,  { id,
                    title,
                    criteriaByIndex,
                    allCriteriaIndexes,
                    questionsByIndex,
                    allQuestionIndexes,
                    documentsByIndex,
                    allDocumentIndexes
                     });
            }
        case TEMPLATE_CREATED:
            {
                return Object.assign({}, state, { title:action.title, id: action.id });
            }
        case TEMPLATE_UPDATED:
            {
                return Object.assign({}, state, { title: action.title });
            }
        case CRITERIA_ADD:
            {
                const criterion = action.criterion;
                Object.keys(state.criteriaByIndex).forEach((key) => {
                    if (state.criteriaByIndex[key].isMaximised) {
                        state.criteriaByIndex[key] = Object.assign({}, state.criteriaByIndex[key], { isMaximised: false });
                    }
                });
                state.criteriaByIndex[criterion.id] = criterion;
                state.allCriteriaIndexes = state.allCriteriaIndexes.concat(criterion.id);
                return Object.assign({}, state);
            }
        case CRITERIA_UPDATE:
            {
                let { id, title, weight } = action;
                let criteriaByIndex = Object.assign({}, state.criteriaByIndex);
                for (let i in state.allQuestionIndexes) {
                    if (state.questionsByIndex[state.allQuestionIndexes[i]].isSaved) {
                        state.questionsByIndex[state.allQuestionIndexes[i]].isSaved = false;
                    }
                }
                for (let i in state.allCriteriaIndexes) {
                    if (state.criteriaByIndex[state.allCriteriaIndexes[i]].isSaved) {
                        state.criteriaByIndex[state.allCriteriaIndexes[i]].isSaved = false;
                    }
                }
                criteriaByIndex[id] = Object.assign({}, criteriaByIndex[id], { title, weight, isSaved:true });

                return Object.assign({}, state, { criteriaByIndex });
            }
        case CRITERIA_DELETE:
            {
                let allCriteriaIndexes = state.allCriteriaIndexes.filter(id => id!==action.id);
                let criteriaByIndex = Object.assign({}, state.criteriaByIndex);
                let allQuestionIndexes = [...state.allQuestionIndexes];
                let questionsByIndex = Object.assign({}, state.questionsByIndex);
                let questions = state.criteriaByIndex[action.id].questions;
                questions.forEach((questionId) => {
                    delete questionsByIndex[questionId];
                    allQuestionIndexes = allQuestionIndexes.slice(allQuestionIndexes.indexOf(questionId), 1);
                });
                delete criteriaByIndex[action.id];
                return Object.assign({}, state, {
                    allCriteriaIndexes,
                    criteriaByIndex,
                    allQuestionIndexes,
                    questionsByIndex
                });
            }
        case DOCUMENT_UPLOAD_SUCCESS: {
            let document = Object.assign({}, state.documentsByIndex[action.documentId]);
            let { documentsByIndex } = state;

            documentsByIndex[action.documentId] =Object.assign({}, document, {
                status: UPLOAD_SUCCESS,
                progress: 100,
                referenceId:action.newDocumentId,
                referenceUrl:action.url
            });

            return Object.assign({}, state);
        }
        case DOCUMENT_UPLOAD_FAILED: {
            state.documentsByIndex[action.documentId] = Object.assign({}, state.documentsByIndex[action.documentId], {
                status: UPLOAD_FAILED,
                progress: action.progress
            });

            return Object.assign({}, state);
        }
        case DOCUMENT_UPLOAD_IN_PROGRESS: {
            state.documentsByIndex[action.documentId] = Object.assign({}, state.documentsByIndex[action.documentId], {
                status: UPLOAD_IN_PROGRESS,
                progress: action.progress
            });

            return Object.assign({}, state);
        }
        case DOCUMENTS_UPLOADING: {
            action.documents.map((document) => {
                state.questionsByIndex[action.questionId].documentIds.push(document.id);
                state.documentsByIndex[document.id] =Object.assign({}, document, {
                    status: UPLOAD_IN_PROGRESS,
                    name: document.name,
                    progress: 15
                });
                state.allDocumentIndexes.push(document.id);
            });
            return Object.assign({}, state);
        }
        case DOCUMENT_DELETE: {
            let questionsByIndex = Object.assign({}, state.questionsByIndex);
            let question = questionsByIndex[action.questionId];
            let allDocumentIndexes = state.allDocumentIndexes.filter(id => id!== action.id);
            let documentsByIndex =  Object.assign({}, state.documentsByIndex);
            delete documentsByIndex[String(action.id)];
            question.documentIds = question.documentIds.filter(id => id!== action.id);
            questionsByIndex[action.id]=question;
            return Object.assign({}, state, { allDocumentIndexes, documentsByIndex, questionsByIndex });
        }
        case QUESTION_ADD:
            {
                let { question, criteriaId } = action;
                let { id } = question;
                let questionsByIndex = Object.assign({}, state.questionsByIndex);
                let criteriaByIndex = Object.assign({}, state.criteriaByIndex);
                questionsByIndex[id] = question;
                let allQuestionIndexes = [...state.allQuestionIndexes, id];
                let questions = [...state.criteriaByIndex[criteriaId].questions, id];
                criteriaByIndex[action.criteriaId] = Object.assign({}, criteriaByIndex[criteriaId], { questions });
                return Object.assign({}, state, { criteriaByIndex, allQuestionIndexes, questionsByIndex });
            }
        case QUESTION_UPDATE:
            {
                let question = Object.assign({}, action.question, { isSaved:true });
                let { id } = question;
                for (let i in state.allQuestionIndexes) {
                    if (state.questionsByIndex[state.allQuestionIndexes[i]].isSaved) {
                        state.questionsByIndex[state.allQuestionIndexes[i]].isSaved = false;
                    }
                }
                for (let i in state.allCriteriaIndexes) {
                    if (state.criteriaByIndex[state.allCriteriaIndexes[i]].isSaved) {
                        state.criteriaByIndex[state.allCriteriaIndexes[i]].isSaved = false;
                    }
                }
                let questionsByIndex = Object.assign({}, state.questionsByIndex);
                questionsByIndex[id] = question;
                return Object.assign({}, state, { questionsByIndex });
            }
        case QUESTION_DELETE:
            {
                let { criteriaId, questionId } =  action;
                let allQuestionIndexes = state.allQuestionIndexes.filter(id => id!==questionId);
                let questionsByIndex = Object.assign({}, state.questionsByIndex);
                delete questionsByIndex[questionId];
                let criteriaByIndex = Object.assign({}, state.criteriaByIndex);
                let questions = state.criteriaByIndex[criteriaId].questions.filter(qnId => qnId!==questionId);
                criteriaByIndex[criteriaId].questions = questions;
                criteriaByIndex[criteriaId] = Object.assign({}, criteriaByIndex[criteriaId], { criteriaId:criteriaByIndex[criteriaId] });

                return Object.assign({}, state, {
                    criteriaByIndex,
                    allQuestionIndexes,
                    questionsByIndex
                });
            }
        case IS_BUSY:
            {
                state.isBusy = action.status;
                return Object.assign({}, state);
            }
        default:
            return state;
    }
}
