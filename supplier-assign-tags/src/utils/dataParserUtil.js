export function formatServiceResponse(data) {
    let arr=[];
    for (let i in data) {
        let item =data[i];
        let  obj = { id: item.id, label: item.attributes.name, value:item.id, iconClass: item.attributes.icon };
        arr.push(obj);
    }
    return arr;
}
export function formatDataForSaveTagService(data) {
    let arr=[];
    for (let i in data) {
        let item =data[i];
        let  obj = { id: item.id, type:'tags' };
        arr.push(obj);
    }
    return { data:arr };
}
