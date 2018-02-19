export const PENDING = 0;
export const IN_PROGRESS = 1;
export const APPROVED = 2;
export const DECLINED = 3;

export const status = {
    [PENDING]: {
        value: PENDING,
        label: 'Pending'
    },
    [IN_PROGRESS]: {
        value: IN_PROGRESS,
        label: 'In Progress'
    },
    [APPROVED]: {
        value: APPROVED,
        label: 'Approved'
    },
    [DECLINED]: {
        value: DECLINED,
        label: 'Declined'
    }
};

export const DEFAULT_ORDER_FIELD = 'status';
export const DEFAULT_ORDER_DIRECTION = 'asc';
