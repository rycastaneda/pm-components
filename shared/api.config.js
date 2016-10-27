/**
 * @description
 * Read token value from cookie
 * And return headers with the correct token
 *
 * @returns {{Authorization: string, Accept: string}}
 */
function configureHeaders() {
    const COOKIE_TOKEN = 'pm_token';

    const token = document.cookie.split(';')
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
 * http://pm-xxx.api.staging.plantminer.com.au
 * http://pm-xxx.api.staging.plantminer.co.nz
 *
 * Production
 * http://api.plantminer.com.au
 * http://api.plantminer.co.nz
 *
 * @returns {string}
 */
function configureHostname() {
    const protocol = 'https://';
    const hostname = window.location.hostname.replace(/www./, '');
    const apiBranch = window.location.search.substr(1).split('&').map(function(pair) {
        return pair.split('=');
    }).reduce(
        function(a, b) {
            a[b[0]] = b[1];
            return a;
        }, {})['apiBranch'];

    if (process.env.NODE_ENV === 'develop') {
        return protocol + 'api.pm.local.dev';
    }

    if (hostname.includes('staging')) {
        if (apiBranch) {
            return protocol + hostname.replace(/.+staging/, apiBranch.toLowerCase() + 'api.staging');
        } else {
            return protocol + hostname.replace(/staging/, 'api.staging');
        }
    }

    return protocol + 'api.' + hostname;
}

module.exports =  {
    configureHostname: configureHostname,
    configureHeaders: configureHeaders
};