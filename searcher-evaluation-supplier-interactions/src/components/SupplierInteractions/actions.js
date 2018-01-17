import * as actionTypes from './actionTypes';
import { assembleIdLinkUrl } from '../../utils/interactionLink';

export const setUpdateCurrentSupplier = (supplierId) => {
    return {
        type: actionTypes.SUPPLIER_INTERACTIONS_SET_UPDATE_CURRENT_SUPPLIER,
        supplierId,
    };
};

export const onClickViewInteraction = (rowItem) => {
    document.location.href = assembleIdLinkUrl(rowItem.id, rowItem.type);
};


