import normalize from 'json-api-normalizer';
import  build  from 'redux-object';
export const EVALUATION_TEMPLATE_SERVICE ='evaluation-templates';
export const EVALUATION_ASSIGNMENT_SERVICE ='evaluation-template-assignments';
export const EVALUATION_ASSIGNMENT_EXPORT_SERVICE ='evaluation-template-assignments/export?';
export const EVALUATION_ASSIGNMENT_COMPLETION ='/searcher/evaluation_assignments/complete/';
export const EVALUATION_ASSIGNMENT_ANALYSE = '/searcher/evaluation_assignments/analyse/';

// const EDIT_PAGE ='/searcher/evaluation/edit_template/';
// const PREVIEW_PAGE ='/searcher/evaluation/preview_template/';
export function getAssignmentServiceUrlFor(queryParams, isExport=false) {

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
    let urlPrefix;
    if (isExport) {
        urlPrefix =EVALUATION_ASSIGNMENT_EXPORT_SERVICE;
    } else {
        urlPrefix =EVALUATION_ASSIGNMENT_SERVICE;
    }
    if (urlPostfix.length) {
        return urlPrefix + urlPostfix;
    }
    return urlPrefix;
}

export function getDataForSave(id, active) {
    const activeStatus = active?1:0;
    return { data:{ type:'evaluation-templates', id, attributes:{ active:activeStatus } } };
}
export function getDataForMarkInProgress(id) {

    return {
        data:{
            id,
            type:'evaluation-template-assignments',
            relationships:{
                assignmentStatus:{
                    data:{
                        id:'2',
                        type:'evaluation-template-assignment-statuses'
                    }
                }
            }
        }
    };
}
export function parseInitializeResponse({ userProfile, evaluationTemplates, evaluationTemplateAssignmentTypes, preferredSuppliers, staff, evaluationTemplateAssignmentStatuses, evaluationAssignments }) {

    userProfile = normalize(userProfile, { endpoint:'users' });
    userProfile = build(userProfile, 'users').map(item => {
        let { id, staff } = item;
        let { firstName, lastName, pitRoles, userId } =staff;
        // user is needs to be a string
        userId = String(userId);
        let { name } =pitRoles[0];
        return { id, firstName, lastName, userId, pitRole:name };
    })[0];
    let result = getDataFromAssignmentService(evaluationAssignments, userProfile);


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
        let label = title;
        return { id, title, label };
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
        let label =firstName+' '+lastName ;
        return { id:userId, firstName, lastName, label };
    });

    evaluationTemplateAssignmentStatuses = normalize(evaluationTemplateAssignmentStatuses, { endpoint:'evaluation-template-assignment-statuses' });
    evaluationTemplateAssignmentStatuses = build(evaluationTemplateAssignmentStatuses, 'evaluationTemplateAssignmentStatuses');
    evaluationTemplateAssignmentStatuses = evaluationTemplateAssignmentStatuses.map((item) => {
        let { id, title } = item;
        return { id, title  };
    });
    return { evaluationTemplates, staff, preferredSuppliers, evaluationTemplateAssignmentTypes, evaluationTemplateAssignmentStatuses, userProfile, ...result };
}
export function getDataFromAssignmentService(evaluationAssignments, userProfile) {
    let totalPages = Number(evaluationAssignments.meta.pagination.total_pages);
    let currentPage = Number(evaluationAssignments.meta.pagination.current_page);
    evaluationAssignments = parseAssignmentsFromData(evaluationAssignments, userProfile);
    return { evaluationAssignments, totalPages, currentPage };
}

export function parseAssignmentFromAssignmentStatusData(data, assignment, userProfile) {
    data = normalize(data, { endpoint:'evaluation-template-assignments' });
    data = build(data, 'evaluationTemplateAssignmentStatuses');
    assignment = { ...assignment };
    let { assignmentStatus, assignedUser, id } = assignment;
    assignmentStatus = data[0];
    let complete_url = null;
    if ((assignmentStatus.id!=='3')&&(String(userProfile.id) === String(assignedUser.id))) {
        complete_url = EVALUATION_ASSIGNMENT_COMPLETION+id;
    }
    return { ...assignment, complete_url, assignmentStatus };
}

export function parseAssignmentsFromData(evaluationAssignments, userProfile) {
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
                assignmentEntityInstance
            } = item;

            createdBy = createdBy.id;
            createdAt = new Date(createdAt.date);
            createdAt.setDate(createdAt.getDate());
            let assignedOn = ('0' + createdAt.getDate()).slice(-2) + '/'
                         + ('0' + (createdAt.getMonth()+1)).slice(-2) + '/'
                         + createdAt.getFullYear();

            let evaluationTemplate = { id:template.id, active:template.id, title:template.title };
            let assignedUser = assigneeUser.staff;
            let userName = assignedUser.firstName+' '+assignedUser.lastName;
            assignedUser = { id:assignedUser.userId, userName };
            let linkedTo = { id:assignmentType.id, title:assignmentType.title };
            assignmentStatus = { id:assignmentStatus.id, title:assignmentStatus.title };

            let supplier;
            switch (assignmentType.id) {
                case '1':
                    supplier = {
                        id: assignmentEntityInstance.id,
                        title:assignmentEntityInstance.title
                    };
                    break;
                case '2':
                    supplier = assignmentEntityInstance.matchedSupplier[0];
                    supplier = {
                        id: supplier.id,
                        title:supplier.title
                    };
                    break;
                default:
                    supplier = assignmentEntityInstance.supplier;
                    supplier = {
                        id: supplier.id,
                        title:supplier.title
                    };
            }

            let complete_url = null;

            let isAdmin = (userProfile.pitRole==='admin');
            // there should be no complete_url if already completed
            // an admin can complete any assignment
            // assigned user can complete an assignment
            if (assignmentStatus.id!=='3') {
                if (isAdmin||(String(userProfile.id) === String(assignedUser.id))) {
                    complete_url = EVALUATION_ASSIGNMENT_COMPLETION+id;
                }
            }

            let view_all_url = EVALUATION_ASSIGNMENT_ANALYSE+id+'#all';
            let view_single_url = EVALUATION_ASSIGNMENT_ANALYSE+id+'#single';
            let view_compare_url = EVALUATION_ASSIGNMENT_ANALYSE+id+'#compare';
            // admin can delete any assignment
            let hasDeleteRight =  Boolean(userProfile.pitRole === 'admin');
            // creator can delete his own assignments
            hasDeleteRight = hasDeleteRight||(item.createdBy === userProfile.userId);

            return { id, assignedOn, createdBy, evaluationTemplate, hasDeleteRight, assignedUser, linkedTo, assignmentStatus, supplier, complete_url, view_all_url, view_single_url, view_compare_url };
        });
    } else {
        evaluationAssignments = [];
    }
    return evaluationAssignments;
}
