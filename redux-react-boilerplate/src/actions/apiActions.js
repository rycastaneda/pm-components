import { CALL_API } from '../middleware/api';

export function fetchCriteria(id) {
    return {
        [CALL_API]: {
            endpoint:
                `/evaluation-templates/${id}?include=criteria.questions`,
        },
    };
}
export function fetchDataFromPitEndpointTemplates() {
    return {
        [CALL_API]: {
            endpoint:
                `/evaluation-templates`,
        },
    };
}
