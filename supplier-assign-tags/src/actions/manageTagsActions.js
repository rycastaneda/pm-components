import { INITIAL_STATE, SELECTED_TAGS_UPDATE, AVAILABLE_TAGS_UPDATE, IS_BUSY, SUPPLIER_ID_UPDATE, REQUEST_FAILED } from '../constants/ActionTypes';
import axios from 'axios';
import { formatServiceResponse, formatDataForSaveTagService } from '../utils/dataParserUtil';
export function initialiseState() {
    return { type:INITIAL_STATE };
}
export function selectItemInDropDown(selectedItems) {
    return updateSelectedItems(selectedItems);
}
export function fetchTags(supplierId) {

    return (dispatch) => {
        axios.get('/tags')
        .then((response) => {
            dispatch(updateAvailableItems(formatServiceResponse(response.data.data), supplierId));
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
    let arr = Array.from(tags, function(element) {
        return element.id;
    });
    return (dispatch) => {
        axios.post('/saveTags', formatDataForSaveTagService(arr))
        .then((response) => {
            dispatch(updateSelectedItems(response.data.data));
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.response.data.message });
        });
    };
}

export function isBusy(status) {
    return {
        type: IS_BUSY,
        status
    };
}

function updateAvailableItems(items, supplierId) {
    return {
        type: AVAILABLE_TAGS_UPDATE,
        availableTags:items,
        supplierId:supplierId
    };
}
function updateSelectedItems(items) {

    return {
        type: SELECTED_TAGS_UPDATE,
        selectedTags:items
    };
}
