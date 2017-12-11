export const EVALUATION_SERVICE ='evaluation-templates';

const EDIT_PAGE ='/searcher/evaluation/edit_template/';
const PREVIEW_PAGE ='/searcher/evaluation/preview_template/';

export function getTemplateServiceUrlFor(keyword=null, status =null, date=null, maxRowLength=null, page=null) {

    let urlPostfix='';
    if (page) {
        urlPostfix +='?page='+page;
    }
    if (maxRowLength) {
        urlPostfix +='&per_page='+maxRowLength;
    }
    if (keyword) {
        urlPostfix +='&filters[title]='+keyword;
    }
    if (status) {
        urlPostfix +='&filters[active]=';
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
        result.templates.push({ id:current.id, name:attrib.title, preview_url:PREVIEW_PAGE+current.id, edit_url:EDIT_PAGE+current.id, completed:0, instances:0, status:Boolean(attrib.active===1) });
    }
    result.totalPages =data.meta.pagination.total_pages;
    result.currentPage =data.meta.pagination.current_page;
    return result;
}
export function getDataForSave(id, active) {
    const activeStatus = active?1:0;
    return { data:{ type:'evaluation-templates', id, attributes:{ active:activeStatus } } };
}
