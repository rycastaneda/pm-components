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
    isBusy:true,
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
                let isBusy = false;
                let { evaluationTemplates, isDeleteEnabled, currentPage, totalPages, evaluationTemplateAssignmentTypes, staff, preferredSuppliers, evaluationTemplateAssignmentStatuses, evaluationAssignments } = action;
                return { ...state, evaluationTemplates, isDeleteEnabled, currentPage, totalPages, evaluationTemplateAssignmentTypes,  staff, preferredSuppliers, evaluationTemplateAssignmentStatuses, evaluationAssignments, isBusy };
            }
        case IS_BUSY:
            {
                let isBusy = action.status;
                return { ...state, isBusy };

            }
        case REQUEST_FAILED:
            {
                let isBusy = false;
                return { ...state, isBusy };

            }
        default:
            return state;
    }
}
