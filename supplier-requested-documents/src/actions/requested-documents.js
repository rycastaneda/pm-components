import {
    FETCH_REQUIREMENTS,
    RECEIVE_REQUIREMENTS,
    DOCUMENTS_RECEIVING,
    DOCUMENT_UPLOAD_IN_PROGRESS,
    DOCUMENT_UPLOAD_SUCCESS,
    DOCUMENT_UPLOAD_FAILED,
    DOCUMENT_REMOVING
} from '../constants';
import requirements from '../mocks/requirements.json';
import axios from 'axios';

export function fetchRequirements(quote_id, item_id) {
    return (dispatch) => {
        dispatch({
            type: FETCH_REQUIREMENTS,
            quote_id,
            item_id
        });

        axios.get(`http://httpbin.org/delay/1`)
            .then(() => {
                return dispatch({ 
                    type: RECEIVE_REQUIREMENTS, 
                    requirements
                });
            });

    };
}

export function incrementProgress(file_id, progress) {
    return {
        type: DOCUMENT_UPLOAD_IN_PROGRESS,
        file_id,
        progress
    };
}

export function removeFile(requirement_id, file_id) {
    return {
        type: DOCUMENT_REMOVING,
        requirement_id,
        file_id
    };
}

export function catchFiles(quote_id, item_id, requirement_id, filesToBeAdded) {
    return (dispatch) => {
        dispatch({
            type: DOCUMENTS_RECEIVING,
            item_id,
            filesToBeAdded
        });

        filesToBeAdded.map((file) => {
            let fileData = new FormData(); 

            fileData.append('quote_id', quote_id);
            fileData.append('item_id', item_id);
            fileData.append('requirement_id', requirement_id);
            fileData.append('document', file);

            return axios.post(`http://httpbin.org/post`, fileData, {
                onUploadProgress: function(progressEvent) {
                    let percentCompleted = progressEvent.loaded / progressEvent.total;
                    dispatch(incrementProgress(file.id, Math.ceil(percentCompleted * 100)));
                }
            }).then((response) => {
                dispatch({
                    type: DOCUMENT_UPLOAD_SUCCESS,
                    requirement_id
                });

                return response;
            }).catch((response) => {
                dispatch({
                    typ: DOCUMENT_UPLOAD_FAILED,
                    file: file.id
                });

                return response;
            });

        });
    };
}
