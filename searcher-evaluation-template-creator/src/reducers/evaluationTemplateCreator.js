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
    MINIMISE_ALL_QUESTIONS,
    MINIMISE_ALL_CRITERIA,
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
            const isBusy = false;
            const { questionTypes } = action;
            return { ...state, questionTypes, isBusy };

        }
        case QUESTION_MAXIMISE_CHANGE: {
            const { id, isMaximised } = action;
            let { questionsByIndex } = state;
            if (isMaximised) {
                // if a question is maximised minimse others.
                Object.values(questionsByIndex).forEach((item) => {
                    item.isMaximised = false;
                });
            }
            let question = questionsByIndex[id];
            questionsByIndex[id] = { ...question, isMaximised };
            return { ...state, questionsByIndex };
        }
        case CRITERIA_MAXIMISE_CHANGE: {
            let { id, isMaximised } = action;
            let { criteriaByIndex, questionsByIndex } = state;
            if (isMaximised) {
                // if a criteria is maximised minimse others.
                Object.values(criteriaByIndex).forEach((item) => {
                    let { id } = item;
                    let isMaximised = false;
                    let criteria = criteriaByIndex[id];
                    criteriaByIndex[id] = { ...criteria, isMaximised };
                });
            } else {
                // if a criteria is minimised, minimise all its questions aswell.
                Object.values(questionsByIndex).forEach((item) => {
                    let isMaximised = false;
                    let { id } = item;
                    let question = questionsByIndex[id];
                    questionsByIndex[id] = { ...question, isMaximised };
                });
            }
            let criteria = criteriaByIndex[id];
            criteriaByIndex[id] = { ...criteria, isMaximised };
            return { ...state, criteriaByIndex, questionsByIndex };
        }
        case MINIMISE_ALL_QUESTIONS :
            {
                let { questionsByIndex } = state;
                Object.values(questionsByIndex).forEach((item) => {
                    let { id } = item;
                    let isMaximised = false;
                    let question = questionsByIndex[id];
                    questionsByIndex[id] = { ...question, isMaximised };
                });
                return { ...state, questionsByIndex };
            }
        case MINIMISE_ALL_CRITERIA:
            {
                let { criteriaByIndex } = state;
                Object.values(criteriaByIndex).forEach((item) => {
                    let { id } = item;
                    let isMaximised = false;
                    let criteria = criteriaByIndex[id];
                    criteriaByIndex[id] = { ...criteria, isMaximised };
                });
                return { ...state, criteriaByIndex };
            }
        case TEMPLATE_FETCHED:
            {
                const isBusy = false;
                const { template } = action;
                const { id,
                    title,
                    criteriaByIndex,
                    allCriteriaIndexes,
                    questionsByIndex,
                    allQuestionIndexes,
                    documentsByIndex,
                    allDocumentIndexes } = template;
                return { ...state, id,
                    title,
                    criteriaByIndex,
                    allCriteriaIndexes,
                    questionsByIndex,
                    allQuestionIndexes,
                    documentsByIndex,
                    allDocumentIndexes,
                    isBusy };
            }
        case TEMPLATE_CREATED:
            {
                const isBusy = false;
                const { title, id } = action;
                return { ...state, title, id, isBusy };
            }
        case TEMPLATE_UPDATED:
            {
                const isBusy = false;
                const { title } = action;
                return { ...state, title, isBusy };

            }
        case CRITERIA_ADD:
            {
                const isBusy = false;
                const { criterion } = action;
                let  { criteriaByIndex, allCriteriaIndexes } = state;
                Object.keys(criteriaByIndex).forEach((key) => {
                    if (criteriaByIndex[key].isMaximised) {
                        criteriaByIndex[key] = Object.assign({}, criteriaByIndex[key], { isMaximised: false });
                    }
                });
                criteriaByIndex[criterion.id] = criterion;
                allCriteriaIndexes = allCriteriaIndexes.concat(criterion.id);
                return { ...state, allCriteriaIndexes, criteriaByIndex, isBusy };
            }
        case CRITERIA_UPDATE:
            {
                const isBusy = false;
                const { id, title, weight } = action;
                let { allCriteriaIndexes, criteriaByIndex, allQuestionIndexes, questionsByIndex } = state;
                criteriaByIndex = { ...criteriaByIndex };
                for (let i in allQuestionIndexes) {
                    if (questionsByIndex[allQuestionIndexes[i]].isSaved) {
                        questionsByIndex[allQuestionIndexes[i]].isSaved = false;
                    }
                }
                for (let i in allCriteriaIndexes) {
                    if (criteriaByIndex[allCriteriaIndexes[i]].isSaved) {
                        criteriaByIndex[allCriteriaIndexes[i]].isSaved = false;
                    }
                }
                criteriaByIndex[id] = Object.assign({}, criteriaByIndex[id], { title, weight, isSaved:true });

                return { ...state, isBusy, criteriaByIndex };
            }
        case CRITERIA_DELETE:
            {
                const isBusy = false;
                let { id } =action;
                let allCriteriaIndexes = state.allCriteriaIndexes.filter(id => id!==action.id);
                let criteriaByIndex = Object.assign({}, state.criteriaByIndex);
                let allQuestionIndexes = [...state.allQuestionIndexes];
                let questionsByIndex = Object.assign({}, state.questionsByIndex);
                let questions = state.criteriaByIndex[action.id].questions;
                questions.forEach((questionId) => {
                    delete questionsByIndex[questionId];
                    allQuestionIndexes = allQuestionIndexes.slice(allQuestionIndexes.indexOf(questionId), 1);
                });
                delete criteriaByIndex[id];
                return { ... state, allCriteriaIndexes, criteriaByIndex, allQuestionIndexes, questionsByIndex, isBusy };
            }
        case DOCUMENT_UPLOAD_SUCCESS: {
            const { documentId, newDocumentId, url } =action;
            let { documentsByIndex } =state;
            let document = { ...documentsByIndex[documentId] };

            documentsByIndex[documentId] = Object.assign({}, document, {
                status: UPLOAD_SUCCESS,
                progress: 100,
                referenceId:newDocumentId,
                referenceUrl:url
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
                const isBusy = false;
                const { question, criteriaId } = action;
                let { id } = question;
                let questionsByIndex = Object.assign({}, state.questionsByIndex);
                let criteriaByIndex = Object.assign({}, state.criteriaByIndex);
                questionsByIndex[id] = question;
                let allQuestionIndexes = [...state.allQuestionIndexes, id];
                let questions = [...state.criteriaByIndex[criteriaId].questions, id];
                criteriaByIndex[action.criteriaId] = Object.assign({}, criteriaByIndex[criteriaId], { questions });
                return { ...state,  criteriaByIndex, allQuestionIndexes, questionsByIndex, isBusy };
            }
        case QUESTION_UPDATE:
            {
                const { isBusy } = action;
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
                return { ...state, questionsByIndex, isBusy };
            }
        case QUESTION_DELETE:
            {
                const isBusy = false;
                const { criteriaId, questionId } =  action;
                let allQuestionIndexes = state.allQuestionIndexes.filter(id => id!==questionId);
                let questionsByIndex = Object.assign({}, state.questionsByIndex);
                delete questionsByIndex[questionId];
                let criteriaByIndex = Object.assign({}, state.criteriaByIndex);
                let questions = state.criteriaByIndex[criteriaId].questions.filter(qnId => qnId!==questionId);
                criteriaByIndex[criteriaId].questions = questions;
                criteriaByIndex[criteriaId] = Object.assign({}, criteriaByIndex[criteriaId], { criteriaId:criteriaByIndex[criteriaId] });

                return { ...state,
                    criteriaByIndex,
                    allQuestionIndexes,
                    questionsByIndex,
                    isBusy };
            }
        case IS_BUSY:
            {
                const { status } = action;
                const isBusy = status;
                return { ...state, isBusy };
            }
        default:
            return state;
    }
}
