import axios from 'axios';
import { getSectionsFromService } from '../utils/dataParser';
import { INITIAL_STATE, REQUEST_FAILED } from '../constants/ActionTypes';

export function initialize() {
    return (dispatch) => {
        return axios.get('http://localhost:5049/getSections')
        .then((response) => {
            let { sections, sectionsIds } =getSectionsFromService(response.data);
            window.console.log(sections);
            dispatch({ type:INITIAL_STATE, sections, sectionsIds });
        })
        .catch((error) => {
            const { message }= error;
            dispatch({ type:REQUEST_FAILED, message });
        });
    };
}
