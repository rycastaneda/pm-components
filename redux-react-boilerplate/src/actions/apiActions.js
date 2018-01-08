import { CALL_API } from '../middleware/api';

export function fetchDataFromEndpointAuthors() {
    return {
        [CALL_API]: {
            endpoint:
                'http://localhost:8080/v1/authors',
        },
    };
}
export function fetchDataFromEndpointBooks() {
    return {
        [CALL_API]: {
            endpoint:
                'http://localhost:8080/v1/authors?include=books',
        },
    };
}
