export const PREFERRED_SUPPLIER_STATUS_INVITED = 0;
export const PREFERRED_SUPPLIER_STATUS_DECLINED_NO_MORE_INVITATION = 1;
export const PREFERRED_SUPPLIER_STATUS_DECLINED = 2;
export const PREFERRED_SUPPLIER_STATUS_APPROVED = 3;
export const PREFERRED_SUPPLIER_STATUS_PENDING_APPROVAL = 4;
export const PREFERRED_SUPPLIER_STATUS_SUSPENDED = 5;
export const PREFERRED_SUPPLIER_STATUS_ONBOARDED = 6;
export const prefStatus = {
    [PREFERRED_SUPPLIER_STATUS_INVITED]: {
        label: 'Invited',
        class: 'info',
        value: PREFERRED_SUPPLIER_STATUS_INVITED
    },
    [PREFERRED_SUPPLIER_STATUS_DECLINED_NO_MORE_INVITATION]: {
        label: 'Declined with no invite',
        class: 'danger',
        value: PREFERRED_SUPPLIER_STATUS_DECLINED_NO_MORE_INVITATION
    },
    [PREFERRED_SUPPLIER_STATUS_DECLINED]: {
        label: 'Declined',
        class: 'danger',
        value: PREFERRED_SUPPLIER_STATUS_DECLINED
    },
    [PREFERRED_SUPPLIER_STATUS_APPROVED]: {
        label: 'Approved',
        class: 'success',
        value: PREFERRED_SUPPLIER_STATUS_APPROVED
    },
    [PREFERRED_SUPPLIER_STATUS_PENDING_APPROVAL]: {
        label: 'Pending',
        class: 'warning',
        value: PREFERRED_SUPPLIER_STATUS_PENDING_APPROVAL
    },
    [PREFERRED_SUPPLIER_STATUS_SUSPENDED]: {
        label: 'Suspended',
        class: 'danger',
        value: PREFERRED_SUPPLIER_STATUS_SUSPENDED
    },
    [PREFERRED_SUPPLIER_STATUS_ONBOARDED]: {
        label: 'Onboarded',
        class: 'success',
        value: PREFERRED_SUPPLIER_STATUS_ONBOARDED
    }
};
