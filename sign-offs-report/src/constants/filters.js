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
