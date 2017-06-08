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
    UPDATED_UNIT,
    ADD_RELATIONSHIPS
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
        case ADD_RELATIONSHIPS:
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
        case ADD_RELATIONSHIPS:
            return state.map(pricingOption =>
                pricingOption.id === action.id ?
                { ...pricingOption,
                    relationships: Object.assign({}, pricingOption.relationships, {
                        'engagement-details': action['engagement-details']
                    }) } : pricingOption
            );

        default:
            return state;
    }
}
