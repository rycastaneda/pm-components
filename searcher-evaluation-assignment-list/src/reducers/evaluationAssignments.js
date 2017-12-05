import { EVALUATION_ASSIGMENTS_FETCHED,
    EVALUATION_TEMPLATE_UPDATED,
    IS_BUSY,
    REQUEST_FAILED,
    INITIALIZED } from '../constants/ActionTypes';
import { MAXROWS_DEFAULT,
    STATUS_DEFAULT } from '../constants/DataConstants';

const INITIAL_DATA = {
    evaluationTemplateAssignmentTypes: [],
    evaluationTemplateAssignmentStatuses:[],
    evaluationTemplates:[],
    filterKeyword:'',
    filterStatus:STATUS_DEFAULT,
    filterDate:null,
    isBusy:false,
    errorMessage:null,
    totalPages:1,
    currentPage:1,
    maxRowLength:MAXROWS_DEFAULT,
    filterStatusList:[],
    staff:[],
    preferredSuppliers: [],
    evaluationAssignments:[]
};

export function evaluationAssignments(state = INITIAL_DATA, action) {

    switch (action.type) {

        case EVALUATION_ASSIGMENTS_FETCHED:
            {
                let { evaluationAssignments, currentPage, totalPages } = action;
                let isBusy = false;
                return { ...state, evaluationAssignments, currentPage, totalPages, isBusy };
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
        case INITIALIZED:
            {
                let { evaluationTemplates, evaluationTemplateAssignmentTypes, staff, preferredSuppliers, evaluationTemplateAssignmentStatuses, evaluationAssignments } = action;
                return { ...state, evaluationTemplateAssignmentTypes, evaluationTemplates, staff, preferredSuppliers, evaluationTemplateAssignmentStatuses, evaluationAssignments };
            }
        default:
            return state;
    }
}
