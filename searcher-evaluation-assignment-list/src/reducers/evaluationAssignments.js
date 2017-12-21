import {
    EVALUATION_ASSIGMENTS_FETCHED,
    EVALUATION_STATUS_UPDATED,
    EVALUATION_ASSIGNMENT_DELETE,
    IS_BUSY,
    REQUEST_FAILED,
    INITIALIZED,
    EVALUATION_ASSIGNMENTS_LIST_UPDATE_CHANGE_ROWS_LENGTH,
} from '../constants/ActionTypes';
import { MAXROWS_DEFAULT } from '../constants/DataConstants';

const INITIAL_DATA = {
    selectedLinkedTo: '',
    selectedTemplate: '',
    selectedAssignedTo: '',
    selectedSupplier: '',
    selectedAssignedOn: '',
    selectedEntityInstanceId: '',
    filterDate: null,
    isBusy: true,
    errorMessage: null,
    totalPages: 1,
    currentPage: 1,
    maxRowLength: MAXROWS_DEFAULT,
    filterStatusList: [],
    staff: [],
    preferredSuppliers: [],
    evaluationAssignments: [],
    evaluationTemplateAssignmentTypes: [],
    evaluationTemplateAssignmentStatuses: [],
    evaluationTemplates: [],
    userProfile:null
};

export function evaluationAssignments(state = INITIAL_DATA, action) {
    switch (action.type) {
        case EVALUATION_ASSIGMENTS_FETCHED: {
            let {
                evaluationAssignments,
                currentPage,
                totalPages,
                selectedLinkedTo,
                selectedTemplate,
                selectedAssignedTo,
                selectedSupplier,
                selectedEntityInstanceId,
                selectedAssignedOn,
            } = action;
            let isBusy = false;

            return {
                ...state,
                evaluationAssignments,
                currentPage,
                totalPages,
                selectedLinkedTo,
                selectedTemplate,
                selectedAssignedTo,
                selectedSupplier,
                selectedEntityInstanceId,
                selectedAssignedOn,

                isBusy,
            };
        }
        case EVALUATION_ASSIGNMENT_DELETE: {
            let { id } = action;
            let evaluationAssignments = state.evaluationAssignments.filter(
                (item) => item.id !== id
            );
            return { ...state, evaluationAssignments };
        }
        case EVALUATION_STATUS_UPDATED: {
            let { id, assignmentStatus } = action;
            let evaluationAssignments = state.evaluationAssignments.map((item) => {
                if (item.id===id) {
                    item ={ ...item, assignmentStatus };
                }
                return item;
            });
            return { ...state, evaluationAssignments };
        }
        case INITIALIZED: {
            let isBusy = false;
            let {
                evaluationTemplates,
                currentPage,
                totalPages,
                evaluationTemplateAssignmentTypes,
                staff,
                preferredSuppliers,
                evaluationTemplateAssignmentStatuses,
                evaluationAssignments,
                userProfile
            } = action;
            return {
                ...state,
                evaluationTemplates,
                currentPage,
                totalPages,
                evaluationTemplateAssignmentTypes,
                staff,
                preferredSuppliers,
                evaluationTemplateAssignmentStatuses,
                evaluationAssignments,
                userProfile,
                isBusy,
            };
        }
        case IS_BUSY: {
            let isBusy = action.status;
            return { ...state, isBusy };
        }
        case REQUEST_FAILED: {
            let isBusy = false;
            return { ...state, isBusy };
        }

        case EVALUATION_ASSIGNMENTS_LIST_UPDATE_CHANGE_ROWS_LENGTH:
            return {
                ...state,
                maxRowLength: action.perPage,
            };

        default:
            return state;
    }
}
