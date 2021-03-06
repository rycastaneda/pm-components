import normalize from 'json-api-normalizer';
import  build  from 'redux-object';
export const EVALUATION_SERVICE ='evaluation-templates';

const EDIT_PAGE ='/searcher/evaluation_templates/edit/';
const PREVIEW_PAGE ='/searcher/evaluation_templates/preview/';
export function getUsers(userData) {

    userData = normalize(userData, { endpoint:'/staff/' });
    userData = build(userData, 'staff');

    return userData.map((user) => {
        let { userId, firstName, lastName } = user;
        let label = firstName +' '+lastName;
        return { id:userId, firstName, lastName, label } ;
    });
}

export function getTemplateServiceUrlFor(keyword=null, status =null, userId=null, maxRowLength=null, page=null, isDateRangeValid, dateTimeEnd, dateTimeStart) {
    window.console.log('build da url.');
    let urlPostfix='meta=instances,completed';
    if (page) {
        urlPostfix +='&page='+page;
    }
    if (maxRowLength) {
        urlPostfix +='&per_page='+maxRowLength;
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
    if (isDateRangeValid) {
        urlPostfix +=`&filter[start_date]=${dateTimeStart}`;
        urlPostfix +=`&filter[end_date]=${dateTimeEnd}`;
    }
    if (userId) {
        urlPostfix +='&filter[created_by]='+userId;
    }

    if (urlPostfix.length) {
        return EVALUATION_SERVICE+'?'+urlPostfix;
    } else {
        return EVALUATION_SERVICE;
    }
}

export function getDataFromTemplateService(data) {
    let totalPages = data.meta.pagination.total_pages;
    let currentPage = data.meta.pagination.current_page;
    let maxRowLength = data.meta.pagination.per_page;
    let templateData = normalize(data, { endpoint:'evaluation-templates' });
    let templateIds = { ...templateData }.meta['evaluation-templates'].data.map(item => item.id);
    let templates = [];
    // if template is defined parse it, else empty template list
    if (templateIds.length) {
        templates = templateIds.map((templateId) => {
            let template = build(templateData, 'evaluationTemplates', templateId);
            const { id, title, meta, active } = template;
            const { date } = template.createdAt;
            let preview_url = PREVIEW_PAGE+id;
            let edit_url = EDIT_PAGE+id;
            return { id, title, date, completed:meta.completed, instances:meta.instances, active, preview_url, edit_url };
        });
    }
    return { templates, totalPages, currentPage, maxRowLength } ;
}

export function getDataForSave(id, active) {
    const activeStatus = active?1:0;
    return { data:{ type:'evaluation-templates', id, attributes:{ active:activeStatus } } };
}
