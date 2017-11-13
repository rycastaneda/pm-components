export function normalizeObject(collections, callback) {
    let normalized = {};
    collections.map((collection) => {
        let relationships = {};
        for (var key in collection.relationships) {
            relationships[key] = [];
            if (!collection.relationships[key].data.length && collection.relationships[key].data.length !== 0) {
                relationships[key] = collection.relationships[key].data.id;
            } else {
                relationships[key] = collection.relationships[key].data.map((relationship) => {
                    return relationship.id;
                });
            }

            if (callback) {
                relationships = callback(relationships);
            }
        }

        collection.relationships = relationships;

        normalized = Object.assign({}, normalized, {
            [collection.id]: {
                id: collection.id,
                type: collection.type,
                ...collection.attributes,
                ...collection.relationships
            }
        });

    });

    return normalized;
}
