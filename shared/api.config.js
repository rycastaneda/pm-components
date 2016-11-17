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
    const protocol = 'https://';
    const hostname = window.location.hostname.replace(/www./, '');
    const countryHost = hostname.includes('nz') ? '.co.nz' : '.com.au';
    const staging = '.api.staging.plantminer';

    const apiBranch = window.location.search.substr(1).split('&').map(function(pair) {
        return pair.split('=');
    }).reduce(
        function(a, b) {
            a[b[0]] = b[1];
            return a;
        }, {})['apiBranch'];

    if (hostname.includes('local.dev') || process.env.NODE_ENV === 'develop') {
        return protocol + 'api.pm.local.dev';
    }

    if (apiBranch) {
        return [protocol, apiBranch.toLowerCase(), staging, countryHost].join('');
    }

    if (hostname.includes('release')) {
        return [protocol, 'release', staging, countryHost].join('');
    }

    if (hostname.includes('hotfix')) {
        return [protocol, 'hotfix', staging, countryHost].join('');
    }

    return [protocol, 'api.plantminer', countryHost].join('');
}

module.exports =  {
    configureHostname: configureHostname,
    configureHeaders: configureHeaders
};