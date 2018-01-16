import axios from 'axios';
import { formatAvailableTagsFromInitialService, formatDataForSaveTagService,
    formatDataForNewTagService } from '../utils/dataParserUtil';
import {
    ALL_TAGS_UPDATE,
     TAG_SAVE,
     NEW_TAG_SAVE,
     REQUEST_FAILED } from '../constants/ActionTypes';

export function saveTag(item) {
    return (dispatch) => {
        if (item.id===null) {
            axios.post('/preferred-supplier-tags', formatDataForNewTagService(item))
            .then((response) => {
                item.id = Number(response.data.data.id);
                dispatch({ type:NEW_TAG_SAVE, item });
            })
            .catch((error) => {
                dispatch({ type:REQUEST_FAILED, message: error.message });
            });
        } else {
            axios.patch('/preferred-supplier-tags/'+item.id,
            formatDataForSaveTagService(item))
            .then(() => {
                dispatch({ type:TAG_SAVE, item });
            })
            .catch((error) => {
                dispatch({ type:REQUEST_FAILED, message: error.message });
            });
        }
    };
}

export function fetchAllTags() {
    return (dispatch) => {
        axios.get('/preferred-supplier-tags')
        .then((response) => {
            let availableTags = formatAvailableTagsFromInitialService(response.data.data);
            dispatch({ type:ALL_TAGS_UPDATE,
            availableTags });
        })
        .catch((error) => {
            dispatch({ type:REQUEST_FAILED, message: error.message });
        });
    };
}
