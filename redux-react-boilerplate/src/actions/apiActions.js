import { CALL_API } from '../middleware/api';

export function fetchDataFromEndpoint() {
    return {
        [CALL_API]: {
            endpoint:
                '/endpoint',
        },
    };
}
