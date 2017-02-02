export function normalizeRequirements(requirements) {
    let state = {
        byId: {},
        allIds: []
    };

    requirements.data.map((requirement) => {
        state.byId[requirement.id] = requirement.attributes;
        state.allIds.push(requirement.id);
    });

    return state;
}

export function normalizeFiles(files) {
    let state = {
        byId: {},
        allIds: []
    };

    files.map((file) => {
        state.byId[file.id] = file;
        state.allIds.push(file.id);
    });

    return state;
}