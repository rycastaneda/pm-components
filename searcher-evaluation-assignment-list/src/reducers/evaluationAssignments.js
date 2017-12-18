import {
    EVALUATION_ASSIGMENTS_FETCHED,
    EVALUATION_ASSIGNMENT_DELETE,
    IS_BUSY,
    REQUEST_FAILED,
    INITIALIZED } from '../constants/ActionTypes';
import { MAXROWS_DEFAULT } from '../constants/DataConstants';

const INITIAL_DATA = {
    selectedLinkedTo:'',
    selectedTemplate:'',
    selectedAssignedTo:'',
    selectedSupplier:'',
    selectedAssignedOn:'',
    selectedEntityInstanceId:'',
    isDeleteEnabled:true,
    filterDate:null,
    isBusy:false,
    errorMessage:null,
    totalPages:1,
    currentPage:1,
    maxRowLength:MAXROWS_DEFAULT,
    filterStatusList:[],
    staff:[],
    preferredSuppliers: [],
    evaluationAssignments:[],
    evaluationTemplateAssignmentTypes: [],
    evaluationTemplateAssignmentStatuses:[],
    evaluationTemplates:[]
};

export function evaluationAssignments(state = INITIAL_DATA, action) {
    switch (action.type) {

        case EVALUATION_ASSIGMENTS_FETCHED:
            {
                let { evaluationAssignments, currentPage, totalPages, selectedLinkedTo,
                selectedTemplate,
                selectedAssignedTo,
                selectedSupplier,
                selectedEntityInstanceId,
                selectedAssignedOn  } = action;
                let isBusy = false;
                return { ...state,
                    evaluationAssignments,
                    currentPage,
                    totalPages,
                    selectedLinkedTo,
                    selectedTemplate,
                    selectedAssignedTo,
                    selectedSupplier,
                    selectedEntityInstanceId,
                    selectedAssignedOn,
                    isBusy };
            }
        case EVALUATION_ASSIGNMENT_DELETE:
            {
                let { id } = action;
                let evaluationAssignments = state.evaluationAssignments.filter(item => item.id!==id);
                return { ...state, evaluationAssignments };

            }
        case INITIALIZED:
            {
                let { evaluationTemplates, isDeleteEnabled, currentPage, totalPages, evaluationTemplateAssignmentTypes, staff, preferredSuppliers, evaluationTemplateAssignmentStatuses, evaluationAssignments } = action;
                return { ...state, evaluationTemplates, isDeleteEnabled, currentPage, totalPages, evaluationTemplateAssignmentTypes,  staff, preferredSuppliers, evaluationTemplateAssignmentStatuses, evaluationAssignments };
            }
        case IS_BUSY:
            state.isBusy = action.status;
            return Object.assign({}, state);

        case REQUEST_FAILED:
            state.isBusy = false;
            return Object.assign({}, state);

        default:
            return state;
    }
}
