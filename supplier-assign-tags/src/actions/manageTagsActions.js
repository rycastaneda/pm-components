import {
    SELECTED_TAGS_UPDATE,
    ALL_TAGS_UPDATE,
    IS_BUSY,
    SUPPLIER_ID_UPDATE,
    REQUEST_FAILED,
    TAG_COMMENT_UPDATE }
    from '../constants/ActionTypes';
import { formatTagsAfterSaveTagsService } from '../utils/dataParserUtil';
import axios from 'axios';

import {
    formatTagsFromInitialService,
    formatDataForSaveTagsService }
    from '../utils/dataParserUtil';

export function updateFocusedTagComment(comment) {
    return { type:TAG_COMMENT_UPDATE, comment };
}

export function selectItemInDropDown(selectedItems) {
    return (dispatch, getState) => {
        dispatch(isBusy(true));
        const service_url = '/preferred-suppliers/'+getState().manageTags.supplierId+'/relationships/tags';
        axios.patch(service_url, formatDataForSaveTagsService(selectedItems))
        .then(() => {
            dispatch({ type:SELECTED_TAGS_UPDATE,
                    selectedTags:selectedItems
                });
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}



export function initialise(supplierId, isReadOnly) {
    return (dispatch) => {
        dispatch(isBusy(true));
        axios.all([axios.get('/preferred-supplier-tags'),
                        axios.get('preferred-suppliers/'+supplierId+'/relationships/tags')])
        .then((response) => {
            dispatch(updateAllTagData(formatTagsFromInitialService(response), supplierId, isReadOnly));
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}

export function updateSupplierId(supplierId) {
    return {
        type:SUPPLIER_ID_UPDATE,
        supplierId
    };
}
export function saveTagComment(tagId, comment) {
    return (dispatch, getState) => {
        let tags = getState().manageTags.selectedTags;
        let index = tags.findIndex(item => item.id === tagId);
        tags[index].comment = comment;
        dispatch(isBusy(true));
        let selectedTags =formatTagsAfterSaveTagsService(tags);
        const service_url = '/preferred-suppliers/'+getState().manageTags.supplierId+'/relationships/tags';
        axios.patch(service_url, formatDataForSaveTagsService(tags))
        .then(() => {
            dispatch({ type:TAG_COMMENT_UPDATE,
                        selectedTags
                    });
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };

}

export function isBusy(status) {
    return {
        type: IS_BUSY,
        status
    };
}

function updateAllTagData(tags, supplierId, isReadOnly) {
    const { availableTags, selectedTags } =tags;
    return {
        type: ALL_TAGS_UPDATE,
        availableTags,
        selectedTags,
        supplierId:supplierId,
        isReadOnly
    };
}
