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
    urlPostfix += '&include=template.criteria.questions,assigneeUser.staff';
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

    let result = getDataFromAssignmentService(evaluationAssignments);
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
        let { userId, firstName, lastName  } = item;
        return { id:userId, firstName, lastName  };
    });

    evaluationTemplateAssignmentStatuses = normalize(evaluationTemplateAssignmentStatuses, { endpoint:'evaluation-template-assignment-statuses' });
    evaluationTemplateAssignmentStatuses = build(evaluationTemplateAssignmentStatuses, 'evaluationTemplateAssignmentStatuses');
    evaluationTemplateAssignmentStatuses = evaluationTemplateAssignmentStatuses.map((item) => {
        let { id, title } = item;
        return { id, title  };
    });


    return { evaluationTemplates, staff, preferredSuppliers, evaluationTemplateAssignmentTypes, evaluationTemplateAssignmentStatuses, ...result };
}
export function getDataFromAssignmentService(evaluationAssignments) {

    let totalPages = Number(evaluationAssignments.meta.pagination.total_pages);
    let currentPage = Number(evaluationAssignments.meta.pagination.current_page);

    evaluationAssignments = normalize(evaluationAssignments, { endpoint:'evaluation-template-assignments' });
    evaluationAssignments = build(evaluationAssignments, 'evaluationTemplateAssignments');

    if (evaluationAssignments) {
        evaluationAssignments = evaluationAssignments.map((item) => {
            let { id,
                createdAt,
                template,
                assigneeUser,
                assignmentStatus,
                assignmentType,
                assignmentEntityInstance
            } = item;

            createdAt = new Date(createdAt.date);
            let assignedOn = createdAt.getDate()+'/'+createdAt.getMonth()+'/'+createdAt.getFullYear();
            let evaluationTemplate = { id:template.id, active:template.id, title:template.title };
            let assignedUser = assigneeUser.staff;
            let userName = assignedUser.lastName+', '+assignedUser.firstName;
            assignedUser = { id:assigneeUser.userId, userName };
            let linkedTo = { id:assignmentType.id, title:assignmentType.title };
            assignmentStatus = { id:assignmentStatus.id, title:assignmentStatus.title };

            let supplier;
            switch (assignmentType.id) {
                case '1':
                    supplier = { id: assignmentEntityInstance.id, title:assignmentEntityInstance.title };
                    break;
                case '2':
                    supplier = assignmentEntityInstance.matchedSupplier[0];
                    supplier = { id: supplier.id, title:supplier.title };
                    break;
                default:
                    supplier = assignmentEntityInstance.supplier;
                    supplier = { id: supplier.id, title:supplier.title };
            }

            return { id, assignedOn, evaluationTemplate, assignedUser, linkedTo, assignmentStatus, supplier };
        });
    } else {
        evaluationAssignments =[];
    }
    let result = { evaluationAssignments, totalPages, currentPage };
    return result;
}
