import { CALL_API } from '../middleware/api';

export function fetchInteractions(preferredSupplier) {
    return {
        [CALL_API]: {
            endpoint:
                `/preferred-suppliers/${preferredSupplier}/interactions`,
        },
    };
}
