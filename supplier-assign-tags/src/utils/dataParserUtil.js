function formatAvailableTagsFromInitialService(data) {
    let arr=[];
    for (let i in data) {
        let item =data[i];
        // consider tag only if it is active.
        let  obj = { id: Number(item.id),
            label: item.attributes.name,
            value:item.id,
            active: Boolean(item.attributes.active),
            iconClass: item.attributes.icon,
            color:item.attributes.icon_colour,
            comment:'',
            hasSavedComment :false };
        arr.push(obj);

    }
    return arr;
}

function formatSelectedTagsFromInitialService(data, availableTags) {
    let arr=new Array();
    for (let i in data) {
        const id = Number(data[i].id);
        const comment = data[i].meta.comment;
        for (let j in availableTags) {
            const currTag = JSON.parse(JSON.stringify(availableTags[j]));
            currTag.comment = comment;
            currTag.hasSavedComment =currTag.comment.length;            
            if (id === currTag.id) {
                arr.push(currTag);
            }
        }
    }
    return arr;
}

export function formatTagsFromInitialService(response) {
    let availableTags = formatAvailableTagsFromInitialService(response[0].data.data);
    const selectedTags = formatSelectedTagsFromInitialService(response[1].data.data, availableTags);
    availableTags = availableTags.filter(tag => tag.active);
    window.console.log(availableTags);
    return { availableTags, selectedTags };
}
export function formatDataForSaveTagsService(data) {
    let arr=new Array();
    for (let i in data) {
        let item =data[i];
        let  obj = { id: item.id, type:'tags', meta:{ comment:item.comment } };
        arr.push(obj);
    }
    return { data:arr };
}

export function formatTagsAfterSaveTagsService(tags) {
    return tags.map((item) => {
        item.hasSavedComment = Boolean(item.comment.length);
        return item;
    });
}
