import {
    TEMPLATE_FETCHED,
    CRITERIA_ADD,
    CRITERIA_DELETE,
    CRITERIA_UPDATE,
    QUESTION_ADD,
    QUESTION_DELETE,
    QUESTION_UPDATE,
    IS_BUSY,
    REQUEST_FAILED } from '../constants/ActionTypes';

// const QUESTION_SKELETON = { id:null, typeId:'scale_five', title:'', isMaximised:true, isAllowScaleDefinitions:false, scaleDefinitions:[], isAllowUpload:false, isCommentRequired:false, Documents:[] };

const CRITERION_SKELETON = { id:null, questions:[], weighting: null, title:'', isMaximised:true };

const INITIAL_DATA = {  isBusy:false, errorMessage:null, id:null, title:'title', criteria:[] };

export function evaluationTemplateCreator(state = INITIAL_DATA, action) {
    switch (action.type) {

        case TEMPLATE_FETCHED:
            return Object.assign({}, state, { id:action.id, title:action.title, criteria:action.criteria });
        case CRITERIA_ADD:
            {
                let newCriterion = JSON.parse(JSON.stringify(CRITERION_SKELETON));
                newCriterion = Object.assign({}, newCriterion, { id:action.id, title:action.title, weighting:action.weighting });
                let criteria = [...this.state.criteria, newCriterion];
                return Object.assign({}, state, { criteria:criteria });
            }
        case CRITERIA_DELETE:
            {
                let criteria =this.state.criteria;
                let index = criteria.findIndex((item) => {
                    return item.id= action.id;
                });
                criteria.splice(index, 1);
                return Object.assign({}, state, { criteria:criteria });
            }
        case CRITERIA_UPDATE:
            {
                let criteria =this.state.criteria;
                let index = criteria.findIndex((item) => {
                    return item.id=== action.id;
                });
                let criterion =criteria[index];
                criterion.title= action.title;
                criterion.weighting=action.weighting;
                return Object.assign({}, state, { criteria:criteria });
            }
        case QUESTION_ADD:
            {
                let criteria =this.state.criteria;
                let index = criteria.findIndex((item) => {
                    return item.id=== action.criteriaId;
                });
                let criterion = criteria[index];
                criterion.questions.push(JSON.parse(JSON.stringify(action.question)));
                return Object.assign({}, state, { criteria:criteria });
            }
        case QUESTION_DELETE:
            {
                let criteria =this.state.criteria;
                let index = criteria.findIndex((item) => {
                    return item.id= action.criteriaId;
                });
                let criterion = criteria[index];
                let qnIndex = criterion.questions.findIndex((item) => {
                    return item.id=== action.questionId;
                });
                criterion.questions.splice(qnIndex, 1);
                return Object.assign({}, state, { criteria:criteria });
            }

        case QUESTION_UPDATE:
            break;

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
