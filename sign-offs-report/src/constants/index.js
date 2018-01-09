export const FETCH_ASSIGNMENTS = 'FETCH_ASSIGNMENTS';
export const RECEIVE_ASSIGNMENTS = 'RECEIVE_ASSIGNMENTS';

export const DOWNLOADED_ASSIGNMENTS = 'DOWNLOADED_ASSIGNMENTS';

export const FETCH_STAFF = 'FETCH_STAFF';
export const RECEIVE_STAFF = 'RECEIVE_STAFF';

export const CHANGE_STATUS_FILTER = '';
export const TOGGLE_COMMENT_MODAL = 'TOGGLE_COMMENT_MODAL';
export const FETCH_COMMENT = 'FETCH_COMMENT';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';

export const TOGGLE_SUPPLIER_ROW = 'TOGGLE_SUPPLIER_ROW';

export const API_ERROR = 'API_ERROR';

export const PENDING = 0;
export const IN_PROGRESS = 1;
export const APPROVED = 2;
export const DECLINED = 3;

export const options = [
    {
        value: PENDING,
        label: 'Pending'
    },
    {
        value: IN_PROGRESS,
        label: 'In Progress'
    },
    {
        value: APPROVED,
        label: 'Approved'
    },
    {
        value: DECLINED,
        label: 'Declined'
    }
];

export const DEFAULT_ORDER_FIELD = 'status';
export const DEFAULT_ORDER_DIRECTION = 'status';
