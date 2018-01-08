import build from 'redux-object';

export const selectFromStore = (state, metaEndpoint, type) => {
    if (typeof state === 'undefined' || !state.meta[metaEndpoint]) {
        return [];
    }
    window.console.log('From Util Endpoint Name: ', metaEndpoint);
    window.console.log('From Util Endpoint: ', state.meta[metaEndpoint]);
    window.console.log('From Util Data: ', state.meta[metaEndpoint].data);
    return (
        (state.meta[metaEndpoint].data || [])
            .map(object => build(state, type, object.id))
    );
};

export const getLoadingForEndpoint = (state, metaEndpoint) => {
    if (typeof state === 'undefined' || !state.meta[metaEndpoint]) {
        return false;
    }

    return state.meta[metaEndpoint].loading;
};