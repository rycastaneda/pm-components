import build from 'redux-object';

export const selectFromStore = (state, metaEndpoint, type) => {

    if (typeof state === 'undefined' || !state.meta[metaEndpoint]) {
        return [];
    }

    return (
        (state.meta[metaEndpoint].data || [])
            .map(object => build(state, type, object.id))
    );
};

