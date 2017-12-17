import { CALL_API } from '../middleware/api';

export function fetchInteractions() {
    return {
        [CALL_API]: {
            endpoint: 'https://d0c27ba0-b85c-4f8d-8577-046dc5bca5bf.mock.pstmn.io/interactions',
        },
    };
}

