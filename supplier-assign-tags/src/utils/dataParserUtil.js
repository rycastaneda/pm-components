function formatAvailableTagsFromInitialService(data) {
    let arr=[];
    for (let i in data) {
        let item =data[i];        
        let  obj = { id: Number(item.id), label: item.attributes.name, value:item.id, iconClass: item.attributes.icon, color:item.attributes.icon_colour };
        arr.push(obj);
    }
    return arr;
}

function formatSelectedTagsFromInitialService(data, availableTags) {
    let arr=new Array();
    for (let i in data) {
        let id =Number(data[i].id);
        for (let j in availableTags) {
            if (id === availableTags[j].id) {
                arr.push(availableTags[j]);
            }
        }
    }
    return arr;
}
export function formatTagsFromInitialService(response) {
    const availableTags = formatAvailableTagsFromInitialService(response[0].data.data);
    const selectedTags = formatSelectedTagsFromInitialService(response[1].data.data, availableTags);
    return { availableTags, selectedTags };
}
export function formatDataForSaveTagService(data) {
    let arr=new Array();
    for (let i in data) {
        let item =data[i];
        let  obj = { id: item.id, type:'tags' };
        arr.push(obj);
    }
    return { data:arr };
}
