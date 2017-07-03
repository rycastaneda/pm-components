import {
    UPDATED_ENGAGEMENT,
    UPDATE_NOTIFY_ALL,
    ACTIVATE_CANCEL_ENGAGEMENT,

    RECEIVE_ENGAGEMENTS,
    ENGAGEMENT_DELETED,
    ENGAGEMENT_CANCELLED,
    UPDATED_ENGAGEMENT_DETAILS,
    ADD_ENGAGEMENT_DETAILS,
    TOGGLE_ENGAGEMENT_TEXT,
    UPDATE_TOTALS
} from '../constants/ActionTypes';

import {
    KEY_CANCELLED,
    KEY_REJECTED
} from '../constants/EngagementTypes';

const INITIAL_ENGAGEMENTS_STATE = {
    pendingEngagements: [],
    sentEngagements: [],
    activateCancelEngagement: {},
    notifyAll: false,
    grandTotalPending:0,
    grandTotal: 0,
    cancelledTotal: 0,
    rejectedTotal: 0
};

export function engagementsReducer(state = INITIAL_ENGAGEMENTS_STATE, action) {
    switch (action.type) {
        case RECEIVE_ENGAGEMENTS:
            return Object.assign({}, state, {
                pendingEngagements: action.pendingEngagements,
                sentEngagements: action.sentEngagements
            });
        case UPDATED_ENGAGEMENT:
        case UPDATED_ENGAGEMENT_DETAILS:
        case ADD_ENGAGEMENT_DETAILS:
        case ENGAGEMENT_DELETED:
            return Object.assign({}, state, {
                pendingEngagements: engagements(state.pendingEngagements, action)
            });
        case UPDATE_TOTALS:
            return Object.assign({}, state, {
                grandTotalPending: getTotal(state.pendingEngagements, 'all'),
                grandTotal: getTotal(state.sentEngagements, 'all'),
                cancelledTotal: getTotal(state.sentEngagements, KEY_CANCELLED),
                rejectedTotal: getTotal(state.sentEngagements, KEY_REJECTED)
            });

        case TOGGLE_ENGAGEMENT_TEXT:
            return Object.assign({}, state, {
                pendingEngagements: engagements(state.pendingEngagements, action),
                sentEngagements: engagements(state.sentEngagements, action)
            });

        case ENGAGEMENT_CANCELLED:
            return Object.assign({}, state, {
                sentEngagements: engagements(state.sentEngagements, action)
            });
        case UPDATE_NOTIFY_ALL:
            return Object.assign({}, state, {
                notifyAll: action.notifyAll
            });
        case ACTIVATE_CANCEL_ENGAGEMENT:
            return Object.assign({}, state, {
                activateCancelEngagement: action.engagement
            });
        default:
            return state;
    }
}

function engagements(state = [], action) {
    switch (action.type) {
        case ENGAGEMENT_DELETED:
            return state.filter(engagement => engagement.id !== action.id);
        case UPDATED_ENGAGEMENT:
            return state.map(engagement =>
                engagement.id === action.engagementId ?
                { ...engagement,
                    attributes: Object.assign({}, engagement.attributes, {
                        po_number: action['purchase-order'] || engagement.attributes.po_number,
                        pre_start_date: action['plan-start-date'] || engagement.attributes.pre_start_date,
                        engagement_text: action['engagement_text'] === '' ? null : action['engagement_text'] || engagement.attributes.engagement_text
                    }) } : engagement
            );
        case TOGGLE_ENGAGEMENT_TEXT:
            return state.map(engagement =>
                engagement.id === action.id ?
                { ...engagement,
                    attributes: Object.assign({}, engagement.attributes, {
                        showEngagementText: engagement.attributes.showEngagementText === undefined ? true : !engagement.attributes.showEngagementText
                    }) } : engagement
            );
        case ENGAGEMENT_CANCELLED:
            return state.map(engagement =>
                engagement.id === action.id ?
                { ...engagement,
                    attributes: Object.assign({}, engagement.attributes, {
                        status: 2
                    }) } : engagement
            );
        case UPDATED_ENGAGEMENT_DETAILS:
            return state.map(engagement =>
                engagement.id === action.engagementId ?
                { ...engagement,
                    engagementDetails: engagementDetails(engagement.engagementDetails, action)
                } : engagement
            );
        case ADD_ENGAGEMENT_DETAILS:
            return state.map(engagement =>
                engagement.id === action.engagementId ?
                { ...engagement,
                    engagementDetails: engagementDetails(engagement.engagementDetails, action)
                } : engagement
            );
        default:
            return state;
    }
}

function engagementDetails(state = [], action) {
    switch (action.type) {
        case UPDATED_ENGAGEMENT_DETAILS:
            return state.map(engagementDetail =>
                engagementDetail.id === action.id ?
                { ...engagementDetail,
                    attributes: Object.assign({}, engagementDetail.attributes, {
                        unit: action.unit
                    }) } : engagementDetail
            );
        case ADD_ENGAGEMENT_DETAILS:
            return [...state, action.engagementDetail];
        default:
            return state;
    }
}

function getTotal(engagementsForTotal, status) {
    let total = engagementsForTotal.reduce(function(a, b) {
        let statusToInclude = (status === 'all') ? true : (b.attributes.status === status);

        if (b.engagementDetails.length && statusToInclude) {
            const qty = b.matchedItem.attributes.quantity;
            b.engagementDetails.forEach(
                engagementDetail => a += (engagementDetail.attributes.rate_value * engagementDetail.attributes.unit * qty)
            );
        }
        return a;
    }, 0);

    return total;
}
