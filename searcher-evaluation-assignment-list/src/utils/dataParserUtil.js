import normalize from 'json-api-normalizer';
import  build  from 'redux-object';
export const EVALUATION_TEMPLATE_SERVICE ='evaluation-templates';
export const EVALUATION_ASSIGNMENT_SERVICE ='evaluation-template-assignments';
export const EVALUATION_ASSIGNMENT_COMPLETION ='/searcher/evaluation_assignments/complete/';

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
        selectedAssignedOn = assignedOn.getFullYear()+'-'+(assignedOn.getMonth()+1)+'-'+assignedOn.getDate();
        urlPostfix +='&filter[created_at]='+selectedAssignedOn;
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

export function parseInitializeResponse({ userProfile, evaluationTemplates, evaluationTemplateAssignmentTypes, preferredSuppliers, staff, evaluationTemplateAssignmentStatuses, evaluationAssignments }) {

    let result = getDataFromAssignmentService(evaluationAssignments);
    userProfile = normalize(userProfile, { endpoint:'users' });
    userProfile = build(userProfile, 'users').map(item => {
        let { id, staff } = item;
        let { firstName, lastName, pitRoles, userId } =staff;
        // user is needs to be a string
        userId = String(userId);
        let { name } =pitRoles[0];
        return { id, firstName, lastName, userId, pitRole:name };
    })[0];

    result.evaluationAssignments = result.evaluationAssignments.map((item) => {
        // admin can delete all assignments
        let isDeletable = Boolean(userProfile.pitRole==='admin');
        // creator can delete his own assignments
        isDeletable = isDeletable||(item.createdBy=== userProfile.userId);
        return { ...item, isDeletable };
    });

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


    return { evaluationTemplates, staff, preferredSuppliers, evaluationTemplateAssignmentTypes, evaluationTemplateAssignmentStatuses, userProfile, ...result };
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
                createdBy,
                template,
                assigneeUser,
                assignmentStatus,
                assignmentType,
                assignmentEntityInstance,
            } = item;
            createdBy = createdBy.id;
            createdAt = new Date(createdAt.date);
            let assignedOn = createdAt.getDate()+'-'+createdAt.getMonth()+'-'+createdAt.getFullYear();
            let evaluationTemplate = { id:template.id, active:template.id, title:template.title };
            let assignedUser = assigneeUser.staff;
            let userName = assignedUser.lastName+', '+assignedUser.firstName;
            assignedUser = { id:assignedUser.userId, userName };
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
            let complete_url = EVALUATION_ASSIGNMENT_COMPLETION+id;
            let isDeletable =false;
            return { id, assignedOn, createdBy, evaluationTemplate, isDeletable, assignedUser, linkedTo, assignmentStatus, supplier, complete_url };
        });
    } else {
        evaluationAssignments =[];
    }
    let result = { evaluationAssignments, totalPages, currentPage };
    return result;
}
