import { setEndpointHost, setEndpointPath, setHeaders } from 'redux-json-api';
import cookie from 'react-cookie';
import { createEntity } from 'redux-json-api';
import log from 'consolelog';
log(2);
const COOKIE_TOKEN = 'pm_token';
const UNAUTHORIZED = 401;

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
}

export function handleError(callback, dispatch, error) {
    log('error', error);
    if (error.response && error.response.status === UNAUTHORIZED) {
        dispatch(setEndpointPath(``));
        dispatch(createEntity({
            type: 'refresh'
        })).then((response) => {
            cookie.save(COOKIE_TOKEN, response.token);
            return callback();
        });
    }

    return error;
}