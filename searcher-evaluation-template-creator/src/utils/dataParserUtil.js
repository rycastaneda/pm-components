export  function getObjectFromArrayWithValueForAttrib(arr, attrib, value) {
    for (var i in arr) {
        if (arr[i][attrib]===value) {
            return arr[i];
        }
    }
}

export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function parseDataForSaveTemplate(title, id) {
    return { data:{ type: 'evaluation-templates', id,  attributes: { title } } };

}

export function parseDataForCreateTemplate(title) {
    return { data:{ type: 'evaluation-templates', attributes: { title } } };
}
