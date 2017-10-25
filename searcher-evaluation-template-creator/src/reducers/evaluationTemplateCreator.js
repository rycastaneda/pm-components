import { IS_BUSY, REQUEST_FAILED } from '../constants/ActionTypes';

const QUESTION_SKELETON = { id:null, typeId:'scale_five', title:'', isAllowScaleDefinitions:false, scaleDefinitions:[], isAllowUpload:false, isCommentRequired:false, Documents:[] };
QUESTION_SKELETON;

const CRITERION_SKELETON = { id:null, questions:[], weighting: null, title:'' };
CRITERION_SKELETON;

const INITIAL_DATA = {  isBusy:false, errorMessage:null, criteria:[{ title:'ee', weighting:10, questions:[{ typeId:1, title:'', isAllowScaleDefinitions:false, scaleDefinitions:[], isAllowUpload:false, isCommentRequired:false, Documents:[] }] }] };

export function evaluationTemplateCreator(state = INITIAL_DATA, action) {
    switch (action.type) {
        case IS_BUSY:
            state.isBusy = action.status;
            return Object.assign({}, state);

        case REQUEST_FAILED:
            state.isBusy = false;
            state.errorMessage = action.message;
            return Object.assign({}, state);

        default:
            return state;
    }
}
