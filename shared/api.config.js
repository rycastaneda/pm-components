/**
 * @description
 * Read token value from cookie
 * And return headers with the correct token
 *
 * @returns {{Authorization: string, Accept: string}}
 */
function configureHeaders() {
    var COOKIE_TOKEN = 'pm_token';

    if (process.env.NODE_ENV === 'develop') return getLocalHeaders();

    var token = document.cookie.split(';')
            .map(function(cookie) {
                return cookie.trim().split('=');
            })
            .reduce(
                function(a, b) {
                    a[b[0]] = b[1];
                    return a;
                }, {})[COOKIE_TOKEN];

    return {
        Authorization: 'Bearer ' + token,
        Accept: 'application/vnd.pm.v1+json'
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
    var tokenRequest = new Request('https:/api.pm.local.dev/authenticate',
        {
            method: 'POST',
            headers: { 'Accept': 'application/vnd.pm.v1+json', 'Content-Type': 'application/vnd.pm.v1+json' },
            body: '{"email":"sara1@plantminer.com.au", "password": "password"}' });

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


/**
 * @description
 * Configure api hostname for different environments
 * Added ability to configure api to point to a different branch on staging
 * For example,
 * https://release.api.staging.plantminer.com.au?apiBranch=pm-1012
 *
 * Local
 * https://api.pm.local.dev
 * https://api.pmnz.local.dev
 *
 * Staging Release
 * https://release.api.staging.plantminer.com.au
 * https://release.api.staging.plantminer.co.nz
 *
 * Staging Hotfix
 * https://hotfix.api.staging.plantminer.com.au
 * https://hotfix.api.staging.plantminer.co.nz
 *
 * Staging Feature
 * https://pm-xxx.api.staging.plantminer.com.au
 * https://pm-xxx.api.staging.plantminer.co.nz
 *
 * Production
 * https://api.plantminer.com.au
 * https://api.plantminer.co.nz
 *
 * @returns {string}
 */
function configureHostname() {
    var protocol = 'https://';
    var hostname = window.location.hostname.replace(/www./, '');
    var countryHost = hostname.indexOf('nz') > -1 ? '.co.nz' : '.com.au';
    var staging = '.api.staging.plantminer';

    var apiBranch = window.location.search.substr(1).split('&').map(function(pair) {
        return pair.split('=');
    }).reduce(
        function(a, b) {
            a[b[0]] = b[1];
            return a;
        }, {})['apiBranch'];

    if (hostname.indexOf('local.dev') > -1 || process.env.NODE_ENV === 'develop') {
        return protocol + 'api.pm.local.dev';
    }

    if (apiBranch) {
        return [protocol, apiBranch.toLowerCase(), staging, countryHost].join('');
    }

    if (hostname.indexOf('staging') > -1) {
        return [protocol, 'release', staging, countryHost].join('');
    }

    if (hostname.indexOf('hotfix') > -1) {
        return [protocol, 'hotfix', staging, countryHost].join('');
    }

    return [protocol, 'api.plantminer', countryHost].join('');
}

module.exports =  {
    configureHostname: configureHostname,
    configureHeaders: configureHeaders
};