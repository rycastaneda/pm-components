import { EVALUATION_TEMPLATES_FETCHED, IS_BUSY, REQUEST_FAILED } from '../constants/ActionTypes';
import { STATUS_LIST, MAXROWS_LIST } from '../constants/DataConstants';

const INITIAL_DATA = { currentTemplateList:[], filterKeyword:'', filterStatus:'', filterDate:null, isBusy:false, errorMessage:null, statusList:STATUS_LIST, rowCountList: MAXROWS_LIST, pageCount:1 };

export function evaluationTemplates(state = INITIAL_DATA, action) {
    switch (action.type) {
        case EVALUATION_TEMPLATES_FETCHED:
            {
                let newState = Object.assign({}, state);
                newState.currentTemplateList = action.evaluationTemplates;
                newState.filterKeyword = action.keyword;
                newState.filterDate = action.date;
                newState.filterStatus = action.status;
                newState.isBusy = false;
                return newState;
            }

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
