import normalize from 'json-api-normalizer';

export const EVALUATION_TEMPLATE_SERVICE ='evaluation-templates';
export const EVALUATION_SERVICE ='evaluation-template-assignments';

// const EDIT_PAGE ='/searcher/evaluation/edit_template/';
// const PREVIEW_PAGE ='/searcher/evaluation/preview_template/';

export function getAssignmentServiceUrlFor(
    maxRowLength = null,
    page = null,
    selectedStatus = null,
    selectedLinkedTo = null,
    selectedTemplate = null,
    selectedAssignedTo = null,
    selectedSupplier = null,
    selectedAssignedOn = null
) {    
    let urlPostfix = '';
    if (page) {
        urlPostfix += '?page=' + page;
    }
    if (maxRowLength) {
        urlPostfix += '&per_page=' + maxRowLength;
    }

    if (selectedStatus) {
        urlPostfix +='&filters[evaluation-template-assignment-statuses]='+selectedStatus;
    }
    if (selectedLinkedTo) {
        urlPostfix +='&filters[evaluation-template-assignment-types]='+selectedLinkedTo;
    }
    if (selectedTemplate) {
        urlPostfix +='&filters[evaluation-template]='+selectedTemplate;
    }
    if (selectedAssignedTo) {
        urlPostfix +='&filters[staff]='+selectedAssignedTo;
    }
    if (selectedSupplier) {
        urlPostfix +='&filters[suppliers]='+selectedSupplier;
    }
    if (selectedAssignedOn) {
        urlPostfix +='&filters[date]='+selectedAssignedOn;
    }

    if (urlPostfix.length) {
        return EVALUATION_SERVICE + urlPostfix;
    }
    return EVALUATION_SERVICE;
}


export function getDataFromAssignmentService(data) {


    let evaluationAssignments = parseEvaluationAssignments(normalize(data));

    let totalPages =data.meta.pagination.total_pages;
    let currentPage =data.meta.pagination.current_page;
    let result ={ evaluationAssignments, totalPages, currentPage };
    return result;
}
export function getDataForSave(id, active) {
    const activeStatus = active?1:0;
    return { data:{ type:'evaluation-templates', id, attributes:{ active:activeStatus } } };
}

export function parseInitializeResponse({ evaluationTemplates, evaluationTemplateAssignmentTypes, preferredSuppliers, staff, evaluationTemplateAssignmentStatuses, evaluationAssignments }) {
    evaluationTemplateAssignmentTypes = normalize(evaluationTemplateAssignmentTypes)['evaluationTemplateAssignmentTypes'];
    evaluationTemplateAssignmentTypes = Object.values(evaluationTemplateAssignmentTypes).map((item) => {
        let { id, attributes } = item;
        let { title } = attributes;
         // let { supplierEmail } = attributes;
        return { id, title };
    });
    let templates = normalize(evaluationTemplates)['evaluationTemplates'];
    evaluationTemplates = Object.values(templates).map((item) => {
        let { id, attributes } = item;
        let { title } = attributes;
        return { id, title };
    });
    preferredSuppliers = normalize(preferredSuppliers)['preferredSuppliers'];
    preferredSuppliers = Object.values(preferredSuppliers).map((item) => {
        let { id, attributes } = item;
        let { supplierEmail } = attributes;
        return { id, userName:supplierEmail };
    });
    staff = normalize(staff)['staff'];
    staff = Object.values(staff).map((item) => {
        let { id, attributes } = item;
        let { firstName, lastName } = attributes;
        return { id, firstName, lastName };
    });
    let assignmentStatuses = normalize(evaluationTemplateAssignmentStatuses)['evaluationTemplateAssignmentStatuses'];
    evaluationTemplateAssignmentStatuses = Object.values(assignmentStatuses).map((item) => {
        let { id, attributes } = item;
        let { title } = attributes;
        return { id, title };
    });

    let result = getDataFromAssignmentService(evaluationAssignments);

    return { evaluationTemplates, staff, preferredSuppliers, evaluationTemplateAssignmentTypes, evaluationTemplateAssignmentStatuses, ...result };
}
function parseEvaluationAssignments(evaluationAssignments) {
    let arr =[];
    Object.keys(evaluationAssignments.evaluationTemplateAssignments).map((key) => {
        let obj = {};
        let assignment =  evaluationAssignments.evaluationTemplateAssignments[key];
        obj.id = assignment.id;
        let assignedOnObj = new Date(assignment.attributes.createdAt.date);
        obj.assignedOn = assignedOnObj.getDate()+'/'+assignedOnObj.getMonth()+'/'+assignedOnObj.getFullYear();
        let templateObj = evaluationAssignments.evaluationTemplates[assignment.relationships.template.data.id];
        obj.evaluationTemplate = { id: templateObj.id, active: templateObj.attributes.active, title: templateObj.attributes.title };
        let userObj= evaluationAssignments.users[assignment.relationships.assigneeUser.data.id];
        obj.assignedUser = { id:userObj.id, userName:userObj.attributes.username };
        let linkedToObj = evaluationAssignments.evaluationTemplateAssignmentTypes[assignment.relationships.assignmentType.data.id];
        obj.linkedTo = { id: linkedToObj.id, title: linkedToObj.attributes.title };
        let entityInstance = assignment.relationships.assignmentEntityInstance.data;
        let supplierObj = evaluationAssignments[entityInstance.type][entityInstance.id];
        obj.supplier = { id: supplierObj.id, title: supplierObj.attributes.title };
        let statusObj = evaluationAssignments.evaluationTemplateAssignmentStatuses[assignment.relationships.assignmentStatus.data.id];
        obj.assignmentStatus = { id:statusObj.id, title:statusObj.attributes.title };
        arr.push(obj);
    });
    return arr;
}
