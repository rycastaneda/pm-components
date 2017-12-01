import { EVALUATION_ASSIGNMENT_SERVICE } from '../constants';
export function getAssignmentServiceUrlFor(
    keyword = null,
    status = null,
    date = null,
    maxRowLength = null,
    page = null
) {
    let urlPostfix = '';
    if (page) {
        urlPostfix += 'page=' + page;
    }
    if (maxRowLength) {
        urlPostfix += 'perpage=' + page;
    }
    if (keyword) {
        urlPostfix += '&filter[keyword]=' + keyword;
    }
    if (status) {
        urlPostfix += '&filter[status]=' + status;
    }
    if (date) {
        urlPostfix += '&filter[created_on]=' + date;
    }
    if (urlPostfix.length) {
        return EVALUATION_ASSIGNMENT_SERVICE + urlPostfix;
    }
    return EVALUATION_ASSIGNMENT_SERVICE;
}
export function getDataFromAssignmentService(data) {

    let assignments = [] ;
    const templateData = data.data;
    for (var i in templateData) {
        let current = templateData[i];
        let attrib = current.attributes;
        assignments.push({
            id: current.id,
            assignedOn: attrib.assigned_on,
            evaluation: attrib.evaluation,
            linkedTo: attrib.linked_to,
            assignedUser: attrib.assigned_user,
            supplierName: attrib.supplier_name,
            status: attrib.status
        });
    }
    return assignments;
}
