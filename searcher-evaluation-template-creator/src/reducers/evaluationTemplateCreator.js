import {
    TEMPLATE_FETCHED,
    TEMPLATE_CREATED,
    TEMPLATE_UPDATED,
    CRITERIA_ADD,
    CRITERIA_DELETE,
    CRITERIA_UPDATE,
    QUESTION_ADD,
    QUESTION_DELETE,
    QUESTION_UPDATE,
    IS_BUSY,
    REQUEST_FAILED
} from '../constants/ActionTypes';

function getInitialData() {
    return {  isBusy:false,
        errorMessage:null,
        id:null,
        title:'',
        criteriaByIndex:{},
        allCriteriaIndexes:[],
        questionsByIndex:{},
        allQuestionIndexes:[]
      };
}

export function evaluationTemplateCreator(state = getInitialData(), action) {
    switch (action.type) {
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
