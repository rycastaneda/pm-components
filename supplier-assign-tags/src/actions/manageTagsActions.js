import { SELECTED_TAGS_UPDATE, ALL_TAGS_UPDATE, IS_BUSY, SUPPLIER_ID_UPDATE, REQUEST_FAILED, TAG_FOCUS, TAG_COMMENT_UPDATE, SELECTED_TAGS_SAVED  } from '../constants/ActionTypes';
import axios from 'axios';
import { formatTagsFromInitialService, formatDataForSaveTagsService, formatTagsAfterSaveTagsService } from '../utils/dataParserUtil';

export function updateFocusedTagComment(comment) {
    return { type:TAG_COMMENT_UPDATE, comment };
}

export function selectItemInDropDown(selectedItems) {
    return updateSelectedItems(selectedItems);
}

export function focusTag(selectedItem) {
    return { type:TAG_FOCUS, selectedItem };
}

export function fetchTags(supplierId) {
    return (dispatch) => {
        dispatch(isBusy(true));
        axios.all([axios.get('/preferred-supplier-tags'), axios.get('preferred-suppliers/'+supplierId+'/relationships/tags')])
        .then((response) => {

            dispatch(updateAllTagData(formatTagsFromInitialService(response), supplierId));
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

export function saveTags(tags) {
    return (dispatch, getState) => {
        dispatch(isBusy(true));
        axios.patch('/preferred-suppliers/'+getState().manageTags.supplierId+'/relationships/tags', formatDataForSaveTagsService(tags))
        .then(() => {
            dispatch({ type:SELECTED_TAGS_SAVED, tags:formatTagsAfterSaveTagsService(tags) });
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

function updateAllTagData(tags, supplierId) {
    const { availableTags, selectedTags } =tags;
    return {
        type: ALL_TAGS_UPDATE,
        availableTags,
        selectedTags,
        supplierId:supplierId
    };
}

function updateSelectedItems(items) {
    return {
        type: SELECTED_TAGS_UPDATE,
        selectedTags:items
    };
}
