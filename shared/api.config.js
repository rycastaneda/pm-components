/**
 * @description
 * Read token value from cookie
 * And return headers with the correct token
 *
 * @returns {{Authorization: string, Accept: string}}
 */
function configureHeaders() {
    var COOKIE_TOKEN = 'pm_token';

    var token = document.cookie.split(';')
            .map(function(cookie) {
                return cookie.trim().split('=');
            })
            .reduce(
                function(a, b) {
                    a[b[0]] = b[1];
                    return a;
                }, {})[COOKIE_TOKEN];

    if (process.env.NODE_ENV === 'develop' && !token) return getLocalHeaders();

    return {
        Authorization: 'Bearer ' + token,
        Accept: 'application/vnd.pm.v1+json',
        'Content-Type': 'application/vnd.pm.v1+json'
    };
}

/**
 * @description
 * Configure token and header for local development
 * This method is used to ease local development of plantminer components
 * It allows to obtain an api token thus make other api request
 *
 * @returns {{Authorization: string, Accept: string}}
 */
function getLocalHeaders() {
    var api_url = window.api_url || 'https://pit-460-api.pmstg.com';
    var tokenRequest = new Request(api_url + 'authenticate', {
        method: 'POST',
        headers: {
            'Accept': 'application/vnd.pm.v1+json',
            'Content-Type': 'application/vnd.pm.v1+json'
        },
        body: '{"email":"troy.redden@bundaberg.qld.gov.au", "password": "password"}'
    });

    fetch(tokenRequest)
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            localStorage.setItem('token', response.token);
        });

    return {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        Accept: 'application/vnd.pm.v1+json',
        'Content-Type': 'application/vnd.pm.v1+json'
    };
}

function configureHostname() {

    if (window.api_url) { // fetched from pm-web configuration
        return window.api_url;
    }

    return 'https://pit-460-api.pmstg.com';
}

module.exports =  {
    configureHostname: configureHostname,
    configureHeaders: configureHeaders
};
