export const EVALUATION_SERVICE ='evaluation-templates';

export function getTemplateServiceUrlFor(keyword=null, status =null, date=null, maxRowLength=null, page=null) {

    let urlPostfix='';
    if (page) {
        urlPostfix +='page='+page;
    }
    if (maxRowLength) {
        urlPostfix +='perpage='+maxRowLength;
    }
    if (keyword) {
        urlPostfix +='&filter[title]='+keyword;
    }
    if (status) {
        urlPostfix +='&filter[active]=';
        if (status==='active') {
            urlPostfix+=1;
        } else {
            urlPostfix+=0;
        }
    }
    if (date) {
        urlPostfix +='&filter[created_at]='+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
    }
    if (urlPostfix.length) {
        return EVALUATION_SERVICE+'?'+urlPostfix;
    } else {
        return EVALUATION_SERVICE;
    }
}

export function getDataFromTemplateService(data) {
    let result={ templates:[] };
    const templateData =data.data;
    for (var i in templateData) {
        let current =templateData[i];
        let attrib=current.attributes;
        result.templates.push({ id:current.id, name:attrib.title, completed:0, instances:0, status:Boolean(attrib.active===1) });
    }
    result.totalPages =data.meta.pagination.total_pages;
    result.currentPage =data.meta.pagination.current_page;
    return result;
}
export function getDataForSave(id, active) {
    const activeStatus = active?1:0;
    return { data:{ type:'evaluation-templates', id, attributes:{ active:activeStatus } } };
}
