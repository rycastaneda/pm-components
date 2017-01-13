export function normalizeObject(collections) {
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
        }

        Object.assign(normalized, {
            [collection.id]: {
                id: collection.id,
                type: collection.type,
                ...collection.attributes,
                ...relationships
            }
        });
    });

    return normalized;
}


export function saveDocument(doc) {
    let index = Plantminer.documents.indexOf(doc.id);
    if (index < 0) {
        Plantminer.documents.push(doc.id);
    } else {
        Plantminer.documents.splice(index, 1);
    }

    return doc;
}

