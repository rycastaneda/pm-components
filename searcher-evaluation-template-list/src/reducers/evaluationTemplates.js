import { EVALUATION_TEMPLATES_FETCHED,
    EVALUATION_TEMPLATE_UPDATED,
    INITIALIZED,
    IS_BUSY,
    REQUEST_FAILED } from '../constants/ActionTypes';
import { MAXROWS_DEFAULT,
    STATUS_DEFAULT } from '../constants/DataConstants';

const INITIAL_DATA = {
    currentTemplateList:[],
    users:[],
    filterUserId:'',
    filterKeyword:'',
    filterStatus:STATUS_DEFAULT,
    filterDate:null,
    isBusy:true,
    errorMessage:null,
    totalPages:1,
    currentPage:1,
    maxRowLength:MAXROWS_DEFAULT
};

export function evaluationTemplates(state = INITIAL_DATA, action) {

    switch (action.type) {
        case INITIALIZED: {
            let isBusy = false;
            let { users, templates, currentPage, totalPages } = action;
            let currentTemplateList = templates;
            return { ...state, users, currentTemplateList, currentPage, totalPages, isBusy };
        }
        case EVALUATION_TEMPLATES_FETCHED:
            {
                let { templates, currentPage, totalPages, maxRowLength, queryParams } = action;
                let { filterKeyword, filterDate, filterStatus, filterUserId } = queryParams;
                let currentTemplateList = templates;
                let isBusy = false;
                return { ...state, isBusy, currentTemplateList, currentPage, totalPages, maxRowLength, filterKeyword, filterDate, filterStatus, filterUserId };
            }
        case EVALUATION_TEMPLATE_UPDATED:
            {
                let { currentTemplateList } = state;
                let { active, id } = action;
                for (let i in currentTemplateList) {
                    let item = currentTemplateList[i];
                    if (item.id===id) {

                        currentTemplateList[i] = { ...item, active };
                    }
                }
                currentTemplateList = [...currentTemplateList];
                let isBusy = false;
                return { ...state, isBusy, currentTemplateList  };
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
