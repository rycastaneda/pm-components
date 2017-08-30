import { INITIAL_STATE, DROPDOWN_SELECT, DROPDOWN_UPDATE, IS_BUSY } from '../constants/ActionTypes';
import axios from 'axios';
export function initialiseState() {
    return { type:INITIAL_STATE };
}
export function selectItemInDropDown(selectedItems) {
    return {
        type: DROPDOWN_SELECT,
        selectedItems
    };
}
export function fetchTags(substr) {
    updateDropDownItems({ tags:[{ id:1, label:'tag1', iconClass:'fa-info-circle' }] });
    isBusy(true);
    return (dispatch) => {
        axios.get(`/fetchTags/${substr}`)
        .then((response) => {
            dispatch(isBusy(false));
            dispatch(updateDropDownItems(response.data.tags));

        });
    };
}

export function saveTags(tags) {
    isBusy(true);
    let arr= Array.from(tags, function(element) {
        return element.id;
    });
    return (dispatch) => {
        axios.post(`/saveTags`, arr)
        .then((response) => {
            dispatch(isBusy(false));
            dispatch(updateDropDownItems(response.data.tags));

        });
    };
}

function isBusy(status) {
    return {
        type: IS_BUSY,
        status
    };
}


function updateDropDownItems(items) {
    return {
        type: DROPDOWN_UPDATE,
        items
    };
}
