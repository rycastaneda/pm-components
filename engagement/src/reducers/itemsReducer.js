import {
    COMPONENT_SPOT,
    UPDATE_QUOTE_ID,
    UPDATE_REQUESTED_ITEM_ID,
    UPDATE_MATCHED_ITEM_ID,
    UPDATE_PANEL_ID,
    UPDATE_REGION_ID,
    UPDATE_ENGAGEMENT_LIMIT,
    UPDATE_ITEM_ID,
    LOAD_ITEMS_SUCCESS,
    LOAD_ITEMS_ERROR,
    RECEIVE_SUGGESTIONS,
    RESET_SUGGESTIONS,
    UPDATE_SUGGESTION,

    RECEIVE_NEW_ENGAGEMENT,
    RESET_CURRENT_ENGAGEMENT,
    RESET_ITEM_DETAILS,
    PRICING_OPTIONS_RECEIVED,
    UPDATE_TEXT,
    UPDATE_PRICING_OPTION,
    RESET_PRICING_OPTIONS,
    UPDATE_PURCHASE_ORDER,
    UPDATE_PLAN_DATE,
    UPDATE_ENGAGEMENT_TEXT,
    UPDATED_ENGAGEMENT,
    UPDATE_NOTIFY_ALL,

    RECEIVE_ENGAGEMENTS,
    ENGAGEMENT_DELETED,
    UPDATED_ENGAGEMENT_DETAILS,
    UPDATED_UNIT
} from '../constants/ActionTypes';

const INITIAL_ITEMS_STATE = {
    isFetching: true,
    isApiError: false,
    items: [],
    suggestions: [],
    quoteId: null,
    rqId: null,
    riqiId: null,
    spot: ''
};

const INITIAL_ITEM_DETAILS_STATE = {
    currentEngagement: {},
    pricingOptions: []
};

const INITIAL_ENGAGEMENTS_STATE = {
    pendingEngagements: [],
    sentEngagements: [],
    notifyAll: false
};

export function itemsReducer(state = INITIAL_ITEMS_STATE, action) {
    switch (action.type) {
        case COMPONENT_SPOT:
            return Object.assign({}, state, {
                spot: action.spot
            });
        case UPDATE_QUOTE_ID:
            return Object.assign({}, state, {
                quoteId: action.quoteId
            });
        case UPDATE_REQUESTED_ITEM_ID:
            return Object.assign({}, state, {
                rqId: action.rqId
            });
        case UPDATE_MATCHED_ITEM_ID:
            return Object.assign({}, state, {
                riqiId: action.riqiId
            });
        case UPDATE_PANEL_ID:
            return Object.assign({}, state, {
                panelId: action.panelId
            });
        case UPDATE_REGION_ID:
            return Object.assign({}, state, {
                regionId: action.regionId
            });
        case UPDATE_ENGAGEMENT_LIMIT:
            return Object.assign({}, state, {
                engagementLimit: action.engagementLimit
            });
        case UPDATE_ITEM_ID:
            return Object.assign({}, state, {
                itemId: action.itemId
            });
        case LOAD_ITEMS_SUCCESS:
            return Object.assign({}, state, {
                items: action.items,
                isFetching: false
            });
        case LOAD_ITEMS_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                isApiError: true
            });
        case RECEIVE_SUGGESTIONS:
        case RESET_SUGGESTIONS:
            return Object.assign({}, state, {
                suggestions: action.suggestions
            });
        case UPDATE_SUGGESTION:
            return Object.assign({}, state, {
                value: action.value
            });
        default:
            return state;
    }
}

export function engagementsReducer(state = INITIAL_ENGAGEMENTS_STATE, action) {
    switch (action.type) {
        case RECEIVE_ENGAGEMENTS:
            return Object.assign({}, state, {
                pendingEngagements: action.pendingEngagements,
                sentEngagements: action.sentEngagements
            });
        case ENGAGEMENT_DELETED:
            return Object.assign({}, state, {
                pendingEngagements: engagements(state.pendingEngagements, action)
            });
        case UPDATED_ENGAGEMENT:
            return Object.assign({}, state, {
                pendingEngagements: engagements(state.pendingEngagements, action)
            });
            // return Object.assign({}, state, {
            //     currentEngagement: { ...state.currentEngagement,
            //         attributes: { ...state.currentEngagement.attributes,
            //             'oldPOVal': null,
            //             'oldPODate': null
            //         }
            //     }
            // });
        case UPDATED_ENGAGEMENT_DETAILS:
            return Object.assign({}, state, {
                pendingEngagements: engagements(state.pendingEngagements, action)
            });
        case UPDATE_NOTIFY_ALL:
            return Object.assign({}, state, {
                notifyAll: action.notifyAll
            });
        default:
            return state;
    }
}


export function itemDetailsReducer(state = INITIAL_ITEM_DETAILS_STATE, action) {
    switch (action.type) {
        case RECEIVE_NEW_ENGAGEMENT:
        case RESET_CURRENT_ENGAGEMENT:
            return Object.assign({}, state, {
                currentEngagement: action.currentEngagement
            });
        case RESET_ITEM_DETAILS:
            return Object.assign({}, state, INITIAL_ITEM_DETAILS_STATE);
        case RESET_PRICING_OPTIONS:
        case PRICING_OPTIONS_RECEIVED:
            return Object.assign({}, state, {
                pricingOptions: action.pricingOptions
            });
        case UPDATE_TEXT:
        case UPDATE_PRICING_OPTION:
        case UPDATED_UNIT:
            return Object.assign({}, state, {
                pricingOptions: pricingOptions(state.pricingOptions, action)
            });
        case UPDATE_PURCHASE_ORDER:
            return Object.assign({}, state, {
                currentEngagement: { ...state.currentEngagement,
                    attributes: { ...state.currentEngagement.attributes,
                        'oldPOVal': state.currentEngagement.attributes.oldPOVal ? state.currentEngagement.attributes.oldPOVal : state.currentEngagement.attributes['purchase-order'],
                        'purchase-order': action.purchaseOrder
                    }
                }
            });
        case UPDATE_ENGAGEMENT_TEXT:
            return Object.assign({}, state, {
                currentEngagement: { ...state.currentEngagement,
                    attributes: { ...state.currentEngagement.attributes,
                        'oldEngagementText': state.currentEngagement.attributes.oldEngagementText ? state.currentEngagement.attributes.oldEngagementText : state.currentEngagement.attributes['engagement_text'] || action.engagement_text,
                        'engagement_text': action.engagement_text
                    }
                }
            });
        case UPDATED_ENGAGEMENT:
            return Object.assign({}, state, {
                currentEngagement: { ...state.currentEngagement,
                    attributes: { ...state.currentEngagement.attributes,
                        'oldPOVal': null,
                        'oldPODate': null,
                        'oldEngagementText': null
                    }
                }
            });
        case UPDATE_PLAN_DATE:
            return Object.assign({}, state, {
                currentEngagement: { ...state.currentEngagement,
                    attributes: { ...state.currentEngagement.attributes,
                        'oldPODate': state.currentEngagement.attributes.oldPODate ? state.currentEngagement.attributes.oldPODate : state.currentEngagement.attributes['plan-start-date'],
                        'plan-start-date': action['plan-start-date']
                    }
                }
            });

        default:
            return state;
    }
}

function pricingOptions(state = [], action) {
    switch (action.type) {
        case UPDATE_TEXT:
            return state.map(pricingOption =>
                pricingOption.id === action.id ?
                { ...pricingOption,
                    attributes: Object.assign({}, pricingOption.attributes, {
                        unit: action.unit
                    }) } : pricingOption
            );
        case UPDATE_PRICING_OPTION:
            return state.map(pricingOption =>
                pricingOption.id === action.id ?
                { ...pricingOption,
                    attributes: Object.assign({}, pricingOption.attributes, {
                        selected: action.selected
                    }) } : pricingOption
            );
        case UPDATED_UNIT:
            return state.map(pricingOption =>
                pricingOption.id === action.id ?
                { ...pricingOption,
                    attributes: Object.assign({}, pricingOption.attributes, {
                        oldUnit: action.oldUnit
                    }) } : pricingOption
            );

        default:
            return state;
    }
}

function engagements(state = [], action) {
    switch (action.type) {
        case ENGAGEMENT_DELETED:
            return state.filter(engagement => engagement.id !== action.id);
        case UPDATED_ENGAGEMENT:
            window.console.log(action['purchase-order'], action['plan-start-date'], action['engagement_text']);
            return state.map(engagement =>
                engagement.id === action.engagementId ?
                { ...engagement,
                    attributes: Object.assign({}, engagement.attributes, {
                        po_number: action['purchase-order'] || engagement.attributes.po_number,
                        pre_start_date: action['plan-start-date'] || engagement.attributes.pre_start_date,
                        engagement_text: action['engagement_text'] === '' ? null : action['engagement_text'] || engagement.attributes.engagement_text
                    }) } : engagement
            );
        case UPDATED_ENGAGEMENT_DETAILS:
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
        default:
            return state;
    }
}
