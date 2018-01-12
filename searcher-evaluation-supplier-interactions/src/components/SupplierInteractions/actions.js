import * as actionTypes from './actionTypes';

export const setUpdateCurrentSupplier = (supplierId) => {
    return {
        type: actionTypes.SUPPLIER_INTERACTIONS_SET_UPDATE_CURRENT_SUPPLIER,
        supplierId,
    };
};

export const onClickViewInteraction = (interActionType, id) => {
    const orgUrl = document.location.href;

    switch (interActionType) {
        case 'Message':
            return (document.location.href = `${orgUrl}searcher/messages`);

        case 'Engagement':
            return (document.location.href = `${orgUrl}searcher/reports/engagement_details/${id}`);

        case 'Evaluation':
            return (document.location.href = `${orgUrl}searcher/evaluation_assignments/analyse/${id}`);

        case 'RFQ':
            return (document.location.href = `${orgUrl}searcher/quotes/quote_details/${id}`);

        default:
            throw 'Corrupted Interaction type provided';
    }
};


