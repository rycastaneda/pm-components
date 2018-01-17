// RFQs
export const Statuses = {
    RFQ: {
        0: 'Open',
        1: 'Quoted',
        2: 'Rejected',
        3: 'Accepted',
        4: 'Pending',
    },
    Evaluation: {
        1: 'Not Started',
        2: 'In Progress',
        3: 'Submitted',
    },
    Engagement: {
        1: 'Pending',
        2: 'Cancelled',
        3: 'Rejected',
        5: 'Sent',
    },
    Message: {
        1: 'Sent',
    },
};

export const StatusesColors = {
    RFQ: {
        0: 'bs-label-warning',
        1: 'bs-label-success',
        2: 'bs-label-danger',
        3: 'bs-label-success',
        4: 'bs-label-warning',
    },
    Evaluation: {
        1: 'bs-label-danger',
        2: 'bs-label-warning',
        3: 'bs-label-success',
    },
    Engagement: {
        1: 'bs-label-warning',
        2: 'bs-label-danger',
        3: 'bs-label-danger',
        5: 'bs-label-success',
    },
    Message: {
        1: 'bs-label-success',
    },
};
