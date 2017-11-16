import { EVALUATION_TEMPLATES_FETCHED,
    EVALUATION_TEMPLATE_UPDATED,
    IS_BUSY,
    REQUEST_FAILED } from '../constants/ActionTypes';
import { MAXROWS_DEFAULT,
    STATUS_DEFAULT } from '../constants/DataConstants';

const INITIAL_DATA = {
    currentTemplateList:[],
    filterKeyword:'',
    filterStatus:STATUS_DEFAULT,
    filterDate:null,
    isBusy:false,
    errorMessage:null,
    totalPages:1,
    currentPage:1,
    maxRowLength:MAXROWS_DEFAULT
};

export function evaluationTemplates(state = INITIAL_DATA, action) {

    switch (action.type) {

        case EVALUATION_TEMPLATES_FETCHED:
            {
                let newState = Object.assign({}, state);
                newState.currentTemplateList = action.evaluationTemplates;
                newState.currentPage = action.currentPage;
                newState.totalPages = action.totalPages;
                newState.isBusy = false;
                return newState;
            }
        case EVALUATION_TEMPLATE_UPDATED:
            {
                let newState = Object.assign({}, state);
                state.currentTemplateList.forEach((item) => {

                    if (item.id === action.id) {
                        item.status = action.status;
                    }
                });
                const currentTemplateList = JSON.parse(JSON.stringify(state.currentTemplateList));
                newState.currentTemplateList = currentTemplateList;

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
