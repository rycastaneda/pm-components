import { setEndpointHost, setEndpointPath, setHeaders } from 'redux-json-api';
import cookie from 'react-cookie';


function getToken() {
    return cookie.load('token');
}

function setTokenToSessionStorage() {
    const token = cookie.load('token') || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM0NTUwLCJpc3MiOiJodHRwOlwvXC9hcGkucG0ubG9jYWwuZGV2XC9hdXRoZW50aWNhdGUiLCJpYXQiOjE0NzYxNTczMzgsImV4cCI6MTQ3NjE2MDkzOCwibmJmIjoxNDc2MTU3MzM4LCJqdGkiOiIwODY0MmI0OGNmZjkzYTFlMzJmZDM2OGI5NTgzNmViOSJ9.R3J1HlDJEzZtSBMR-SB9p8jvKQ6QbiI4frzQ8LGYEUY';
    window.sessionStorage.setItem('token', token);
}

export function configureApi(store) {
    const tokenInSessionStorage = window.sessionStorage.getItem('token');
    if (!tokenInSessionStorage) {
        setTokenToSessionStorage();
    }
    const API_ENDPOINT = 'https://api.pm.local.dev';
    const token = getToken() || tokenInSessionStorage;

    if (process.env.NODE_ENV === 'develop') {
        // add logic for develop vs production and staging
    }

    store.dispatch(setEndpointHost(API_ENDPOINT));
    store.dispatch(setEndpointPath(''));

    store.dispatch(setHeaders({
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.pm.v1+json'
    }));
}