import {
    INITIALIZED,
    TEMPLATE_FETCHED,
    TEMPLATE_CREATED,
    TEMPLATE_UPDATED,
    CRITERIA_ADD,
    CRITERIA_DELETE,
    CRITERIA_UPDATE,
    QUESTION_ADD,
    QUESTION_DELETE,
    QUESTION_UPDATE,
    DOCUMENT_UPLOAD_SUCCESS,
    DOCUMENT_UPLOAD_FAILED,
    DOCUMENT_UPLOAD_IN_PROGRESS,
    DOCUMENTS_UPLOADING,
    IS_BUSY,
    REQUEST_FAILED
} from '../constants/ActionTypes';

import {
    UPLOAD_IN_PROGRESS,
    UPLOAD_SUCCESS,
    UPLOAD_FAILED
} from '../constants';

function getInitialData() {
    return {  isBusy:false,
        errorMessage:null,
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
            return Object.assign({}, state, { questionTypes });
        }
        case TEMPLATE_FETCHED:
            {
                return Object.assign({}, state, { id:action.id, title:action.title, criteria:action.criteria });
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
                window.console.log(state);
                return Object.assign({}, state);
            }
        case CRITERIA_UPDATE:
            {
                let { id, title, weight } = action;
                let criteriaByIndex = Object.assign({}, state.criteriaByIndex);
                criteriaByIndex[id] = Object.assign({}, criteriaByIndex[id], { title, weight });

                return Object.assign({}, state, { criteriaByIndex });
            }
        case CRITERIA_DELETE:
            {
                let allCriteriaIndexes = state.allCriteriaIndexes.filter(id => id!==action.id);
                let criteriaByIndex = Object.assign({}, state.criteriaByIndex);
                let allQuestionIndexes = [...state.allQuestionIndexes];
                let questionsByIndex = Object.assign({}, state.questionsByIndex);
                let questions = state.criteriaByIndex[action.id].questions;
                questions.forEach((item) => {
                    questionsByIndex = questionsByIndex.filter(thisItem => thisItem.id!==item.id) ;
                    allQuestionIndexes = allQuestionIndexes.slice(allQuestionIndexes.findIndex(item), 1);
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
            action.documents.map((document) => {
                state.documentsByIndex[document.id] =Object.assign({}, document, {
                    status: UPLOAD_SUCCESS,
                    progress: 100
                });
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

        case QUESTION_ADD:
            {
                let { question, criteriaId } = action;
                let { id } = question;
                window.console.log('reducer');
                window.console.log(question);
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
                let question = Object.assign({}, action.question);
                let { id } = question;
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
                let questions = state.criteriaByIndex[criteriaId].questions;
                questions.forEach((item) => {
                    questionsByIndex = questionsByIndex.filter(thisItem => thisItem.id!==item.id) ;
                    allQuestionIndexes = allQuestionIndexes.slice(allQuestionIndexes.findIndex(item), 1);
                });
                delete criteriaByIndex[action.id];
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
        case REQUEST_FAILED:
            {
                state.isBusy = false;
                state.errorMessage = action.message;
                return Object.assign({}, state);
            }
        default:
            return state;
    }
}
