export function formatAvailableTagsFromInitialService(data) {
    let arr=[];
    for (let i in data) {

        let item =data[i];
        let  obj = { isActive:Number(item.attributes.active), id: Number(item.id), title: item.attributes.name, value:item.id, iconClass: item.attributes.icon, description:item.attributes.description, color:item.attributes.icon_colour };
        arr.push(obj);
    }

    return arr;
}

export function formatDataForSaveTagService(data) {
    window.console.log(data);
    return { data:{  type:'preferred-supplier-tags', id:data.id, attributes:{ name:data.title, icon:data.iconClass, icon_colour:data.color, description:data.description, active:Number(data.isActive) } } };
}

export function formatDataForNewTagService(data) {
    return { data:{  type:'preferred-supplier-tags',  attributes:{ name:data.title, icon:data.iconClass, icon_colour:data.color, description:data.description, active:Number(data.isActive) } } };
}
