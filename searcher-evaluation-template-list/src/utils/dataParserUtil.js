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
        return { id:userId, firstName, lastName } ;
    });
}

export function getTemplateServiceUrlFor(keyword=null, status =null, date=null, userId=null, maxRowLength=null, page=null) {

    let urlPostfix='';
    if (page) {
        urlPostfix +='page='+page;
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
    if (date) {
        urlPostfix +='&filter[created_at]='+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
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

    let templates = build(normalize(data, { endpoint:'evaluation-templates' }), 'evaluationTemplates');
    // if template is defined parse it, else empty template list
    if (templates) {
        templates = templates.map((template) => {
            let { id, title, completed, instances, active } = template;
            let preview_url = PREVIEW_PAGE+id;
            let edit_url = EDIT_PAGE+id;
            completed = completed?completed:0;
            instances = instances?instances:0;
            return { id, title, completed, instances, active, preview_url, edit_url };
        });
    } else {
        templates =[];
    }


    let totalPages = data.meta.pagination.total_pages;
    let currentPage = data.meta.pagination.current_page;

    return { templates, totalPages, currentPage } ;
}
export function getDataForSave(id, active) {
    const activeStatus = active?1:0;
    return { data:{ type:'evaluation-templates', id, attributes:{ active:activeStatus } } };
}
