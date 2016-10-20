import { setEndpointHost, setEndpointPath, setHeaders } from 'redux-json-api';
import cookie from 'react-cookie';

const COOKIE_TOKEN = 'pm_token';

function getToken() {
    return cookie.load(COOKIE_TOKEN);
}

export function configureApi(store) {
    const HOSTNAME = process.env.NODE_ENV !== 'production' ? 'pm.local.dev' : window.location.hostname;
    const API_HOST = `${window.location.protocol}//api.${HOSTNAME}`;
    const token = getToken() || '';

    store.dispatch(setEndpointHost(API_HOST));
    store.dispatch(setEndpointPath(''));

    store.dispatch(setHeaders({
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.pm.v1+json'
    }));
}