import normalize from 'json-api-normalizer';
import  build  from 'redux-object';
export const EVALUATION_TEMPLATE_SERVICE ='evaluation-templates';
export const EVALUATION_ASSIGNMENT_SERVICE ='evaluation-template-assignments';

// const EDIT_PAGE ='/searcher/evaluation/edit_template/';
// const PREVIEW_PAGE ='/searcher/evaluation/preview_template/';

export function getAssignmentServiceUrlFor(queryParams) {
    let urlPostfix = '';
    let { currentPage, maxRowLength, selectedStatus, selectedLinkedTo, selectedTemplate, selectedAssignedTo, selectedSupplier, selectedEntityInstanceId, selectedAssignedOn } =queryParams;
    if (currentPage) {
        urlPostfix += '?page=' + currentPage;
    }
    if (maxRowLength) {
        urlPostfix += '&per_page=' + maxRowLength;
    }

    if (selectedStatus&&selectedStatus!=='') {
        urlPostfix +='&filter[evaluation_template_assignment_status_id]='+selectedStatus;
    }
    if (selectedLinkedTo&&selectedLinkedTo!=='') {
        urlPostfix +='&filter[evaluation_template_assignment_type_id]='+selectedLinkedTo;
    }
    if (selectedTemplate&&selectedTemplate!=='') {
        urlPostfix +='&filter[evaluation_template_id]='+selectedTemplate;
    }
    if (selectedAssignedTo&&selectedAssignedTo!=='') {
        urlPostfix +='&filter[assignee_user_id]='+selectedAssignedTo;
    }
    if (selectedEntityInstanceId&&selectedEntityInstanceId!=='') {
        urlPostfix +='&filter[assignment_entity_instance_id]='+selectedEntityInstanceId;
    }
    if (selectedSupplier&&selectedSupplier!=='') {
        urlPostfix +='&filter[preferred_supplier_id]='+selectedSupplier;
    }
    if (selectedAssignedOn&&selectedAssignedOn!=='') {
        let assignedOn = new Date(selectedAssignedOn);
        selectedAssignedOn = assignedOn.getDate()+'/'+assignedOn.getMonth()+'/'+assignedOn.getFullYear();
        urlPostfix +='&filter[date]='+selectedAssignedOn;
    }

    if (urlPostfix.length) {
        return EVALUATION_ASSIGNMENT_SERVICE + urlPostfix;
    }
    return EVALUATION_ASSIGNMENT_SERVICE;
}

export function getDataForSave(id, active) {
    const activeStatus = active?1:0;
    return { data:{ type:'evaluation-templates', id, attributes:{ active:activeStatus } } };
}

export function parseInitializeResponse({ evaluationTemplates, evaluationTemplateAssignmentTypes, preferredSuppliers, staff, evaluationTemplateAssignmentStatuses, evaluationAssignments }) {
    window.console.log(build(normalize(evaluationAssignments, { endpoint:'evaluation-template-assignments' }), 'evaluationTemplateAssignments'));
    evaluationTemplateAssignmentTypes = normalize(evaluationTemplateAssignmentTypes, { endpoint:'evaluation-template-assignment-types' });
    evaluationTemplateAssignmentTypes = build(evaluationTemplateAssignmentTypes, 'evaluationTemplateAssignmentTypes');
    evaluationTemplateAssignmentTypes = evaluationTemplateAssignmentTypes.map((item) => {
        let { id, title } = item;
        return { id, title };
    });

    evaluationTemplates = normalize(evaluationTemplates, { endpoint:'evaluation-templates' });
    evaluationTemplates = build(evaluationTemplates, 'evaluationTemplates');
    evaluationTemplates = evaluationTemplates.map((item) => {
        let { id, title } = item;
        return { id, title };
    });

    preferredSuppliers = normalize(preferredSuppliers, { endpoint:'preferred-suppliers' });
    preferredSuppliers = build(preferredSuppliers, 'preferredSuppliers');
    preferredSuppliers = preferredSuppliers.map((item) => {

        let { id, supplierEmail } = item;
        return { id, userName:supplierEmail };
    });

    staff = normalize(staff, { endpoint:'staff' });
    staff = build(staff, 'staff');
    staff = staff.map((item) => {
        let { id, firstName, lastName  } = item;
        return { id, firstName, lastName  };
    });

    evaluationTemplateAssignmentStatuses = normalize(evaluationTemplateAssignmentStatuses, { endpoint:'evaluation-template-assignment-statuses' });
    evaluationTemplateAssignmentStatuses = build(evaluationTemplateAssignmentStatuses, 'evaluationTemplateAssignmentStatuses');
    evaluationTemplateAssignmentStatuses = evaluationTemplateAssignmentStatuses.map((item) => {
        let { id, title } = item;
        return { id, title  };
    });

    let result = getDataFromAssignmentService(evaluationAssignments);

    return { evaluationTemplates, staff, preferredSuppliers, evaluationTemplateAssignmentTypes, evaluationTemplateAssignmentStatuses, ...result };
}
export function getDataFromAssignmentService(evaluationAssignments) {
    let totalPages =evaluationAssignments.meta.pagination.total_pages;
    let currentPage =evaluationAssignments.meta.pagination.current_page;
    evaluationAssignments = normalize(evaluationAssignments, { endpoint:'evaluation-template-assignments' });
    evaluationAssignments = build(evaluationAssignments, 'evaluationTemplateAssignments');
    window.console.log(evaluationAssignments);
    evaluationAssignments = evaluationAssignments.map((item) => {
        let { id, createdAt, template, chairStaff, assigneeUser, assignmentStatus, assignmentType, assignmentEntityInstance
 } = item;
        window.console.log(item);
        window.console.log(id, createdAt, template, chairStaff, assigneeUser, assignmentStatus, assignmentType, assignmentEntityInstance);
        createdAt = new Date(createdAt.date);
        let assignedOn = createdAt.getDate()+'/'+createdAt.getMonth()+'/'+createdAt.getFullYear();

        let evaluationTemplate = { id:template.id, active:template.id, title:template.title };
        let assignedUser = { id:assigneeUser.id, userName: assigneeUser.username };
        let linkedTo = { id:assignmentType.id, title:assignmentType.title };
        assignmentStatus = { id:assignmentStatus.id, title:assignmentStatus.title };

        let supplier = { id: 0, title:' supplierObj.attributes.title', type:'entityInstance.type', typeId:'entityInstance.id' };
        return { id, assignedOn, evaluationTemplate, assignedUser, linkedTo, assignmentStatus, supplier };
    });

    let result = { evaluationAssignments, totalPages, currentPage };
    return result;
}
/*
function parseEvaluationAssignments(evaluationAssignments) {
    let arr =[];
// evaluationAssignments = normalize(evaluationAssignments);
    window.console.log(evaluationAssignments);
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
        obj.supplier = { id: supplierObj.id, title: supplierObj.attributes.title, type:entityInstance.type, typeId:entityInstance.id };
        let statusObj = evaluationAssignments.evaluationTemplateAssignmentStatuses[assignment.relationships.assignmentStatus.data.id];
        obj.assignmentStatus = { id:statusObj.id, title:statusObj.attributes.title };
        arr.push(obj);
    });
    return arr;
}
*/
