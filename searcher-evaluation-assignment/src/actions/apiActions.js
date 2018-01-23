import { CALL_API } from '../middleware/api';

export function fetchEvaluationTemplates() {
    return {
        [CALL_API]: {
            endpoint: '/evaluation-templates',
        },
    };
}

export function fetchAssigneesStaff() {
    return {
        [CALL_API]: {
            endpoint: '/staff?filter[pitRoles]=1,2,3,4&filter[is_deleted]=0',
        },
    };
}

export function fetchEvaluationTypes() {
    return {
        [CALL_API]: {
            endpoint: '/evaluation-template-assignment-types',
        },
    };
}

export function fetchEngagements() {
    return {
        [CALL_API]: {
            endpoint: '/engagements',
        },
    };
}

export function fetchPreferredSuppliers() {
    return {
        [CALL_API]: {
            endpoint: '/preferred-suppliers',
        },
    };
}

export function fetchRequestsForQuotations() {
    return {
        [CALL_API]: {
            endpoint: '/request-for-quotations?filter[sent]=1&filter[archived]=0',
        },
    };
}

export function fetchRfqMatchedSuppliers(rfqTypeId) {
    return {
        [CALL_API]: {
            endpoint: `/request-for-quotations/${rfqTypeId}/matched-suppliers`,
        },
    };
}

export function fetchMatchedItems(rfqTypeId, matchedSupplierId) {
    return {
        [CALL_API]: {
            endpoint: `/request-for-quotations/${rfqTypeId}/matched-suppliers/${matchedSupplierId}/matched-items`,
        },
    };
}

export function fetchUser() {
    return {
        [CALL_API]: {
            endpoint: '/user?include=staff.pitRoles',
        },
    };
}
