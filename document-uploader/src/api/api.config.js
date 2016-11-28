import { setEndpointHost, setEndpointPath, setHeaders } from 'redux-json-api';
import cookie from 'react-cookie';
import axios from 'axios';

const COOKIE_TOKEN = 'pm_token';

function getToken() {
    return cookie.load(COOKIE_TOKEN);
}

export function configureApi(store) {
    const API_HOST = `${window.location.protocol}//api2.${window.location.hostname}`;
    const token = getToken();

    store.dispatch(setEndpointHost(API_HOST));
    store.dispatch(setEndpointPath(``));

    store.dispatch(setHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.pm.v1+json'
    }));

    axios.defaults.baseURL = API_HOST;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
