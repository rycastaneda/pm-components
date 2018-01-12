import normalize from 'json-api-normalizer';
import  build  from 'redux-object';
import moment from 'moment';
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
    if (evaluationTemplateAssignmentTypes) {
        evaluationTemplateAssignmentTypes = evaluationTemplateAssignmentTypes.map((item) => {
            let { id, title } = item;
            return { id, title };
        });

    } else {
        evaluationTemplateAssignmentTypes =[];
    }
    evaluationTemplates = normalize(evaluationTemplates, { endpoint:'evaluation-templates' });
    evaluationTemplates = build(evaluationTemplates, 'evaluationTemplates');
    if (evaluationTemplates) {
        evaluationTemplates = evaluationTemplates.map((item) => {
            let { id, title } = item;
            let label = title;
            return { id, title, label };
        });
    } else {
        evaluationTemplates = [];
    }

    preferredSuppliers = normalize(preferredSuppliers, { endpoint:'preferred-suppliers' });
    preferredSuppliers = build(preferredSuppliers, 'preferredSuppliers');
    if (preferredSuppliers) {
        preferredSuppliers = preferredSuppliers.map((item) => {
            let { id, supplierEmail } = item;
            return { id, userName:supplierEmail };
        });
    } else {
        preferredSuppliers =[];
    }


    staff = normalize(staff, { endpoint:'staff' });
    staff = build(staff, 'staff');

    if (staff) {
        staff = staff.map((item) => {
            let { userId, firstName, lastName  } = item;
            let label =firstName+' '+lastName ;
            return { id:userId, firstName, lastName, label };
        });

    } else {
        staff = [];
    }
    evaluationTemplateAssignmentStatuses = normalize(evaluationTemplateAssignmentStatuses, { endpoint:'evaluation-template-assignment-statuses' });
    evaluationTemplateAssignmentStatuses = build(evaluationTemplateAssignmentStatuses, 'evaluationTemplateAssignmentStatuses');
    if (evaluationTemplateAssignmentStatuses) {
        evaluationTemplateAssignmentStatuses = evaluationTemplateAssignmentStatuses.map((item) => {
            let { id, title } = item;
            return { id, title  };
        });
    } else {
        evaluationTemplateAssignmentStatuses = [];
    }
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
    let isAdmin =  Boolean(userProfile.pitRole === 'admin');
    let isMarkInProgressAllowed = isAdmin&&(assignmentStatus.id==='3');
    return { ...assignment, complete_url, assignmentStatus, isMarkInProgressAllowed };
}

export function parseAssignmentsFromData(evaluationAssignmentsData, userProfile) {
    evaluationAssignmentsData = normalize(evaluationAssignmentsData, { endpoint:'evaluation-template-assignments' });
    // to keep the ordering from server.
    let evaluationAssignmentIds = { ...evaluationAssignmentsData }.meta['evaluation-template-assignments'].data.map(item => item.id);
    let evaluationAssignments =[];
    if (evaluationAssignmentIds.length) {
        evaluationAssignments = evaluationAssignmentIds.map((evaluationAssignmentId) => {
            let item =  build(evaluationAssignmentsData, 'evaluationTemplateAssignments', evaluationAssignmentId);
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

            let assignedOn = moment.utc(createdAt.date).local().format('DD/MM/YYYY');
            let evaluationTemplate = { id:template.id, active:template.id, title:template.title };
            let assignedUser = assigneeUser.staff;
            let userName = assignedUser.firstName+' '+assignedUser.lastName;
            assignedUser = { id:assignedUser.userId, userName };
            let linkedTo = { id:assignmentType.id, title:assignmentType.title };
            assignmentStatus = { id:assignmentStatus.id, title:assignmentStatus.title };
            let isAdmin =  Boolean(userProfile.pitRole === 'admin');
            // creator can delete his own assignments
            let isDeleteAllowed = isAdmin||(item.createdBy === userProfile.userId);
            isDeleteAllowed =isDeleteAllowed&&(assignmentStatus.id==='1');
            let isMarkInProgressAllowed = isAdmin&&(assignmentStatus.id==='3');
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
            // there should be no complete_url if already completed
            // only assigned user can complete an assignment
            if (assignmentStatus.id!=='3') {
                if ((String(userProfile.id) === String(assignedUser.id))) {
                    complete_url = EVALUATION_ASSIGNMENT_COMPLETION+id;
                }
            }

            let view_all_url = EVALUATION_ASSIGNMENT_ANALYSE+id+'#all';
            let view_single_url = EVALUATION_ASSIGNMENT_ANALYSE+id+'#single';
            let view_compare_url = EVALUATION_ASSIGNMENT_ANALYSE+id+'#compare';
            // admin can delete any assignment

            return { id, assignedOn, createdBy, evaluationTemplate, assignedUser, linkedTo, assignmentStatus, supplier, complete_url, view_all_url, view_single_url, isDeleteAllowed, isMarkInProgressAllowed, view_compare_url };
        });
    }
    return evaluationAssignments;
}
