import {
    UPDATE_TEMPLATE_ASSIGNMENT,
    CRITERIA_UPDATED,
    QUESTION_UPDATED,
    ASSIGNMENT_SUBMITTED,
    DOCUMENT_UPLOAD_SUCCESS,
    DOCUMENT_UPLOAD_FAILED,
    DOCUMENT_UPLOAD_IN_PROGRESS,
    DOCUMENTS_UPLOADING,
    DOCUMENT_DELETE,
    IS_BUSY
} from '../constants/ActionTypes';

import {
    UPLOAD_IN_PROGRESS,
    UPLOAD_SUCCESS,
    UPLOAD_FAILED
} from '../constants';

const INITIAL_EVALUATION_SUBMISSION_STATE = { criteriaByIndex:{}, criteriaIds:[], assignmentStatus:{ id:null, title:'' } };

export function evaluationSubmission(state = INITIAL_EVALUATION_SUBMISSION_STATE, action) {
    switch (action.type) {

        case UPDATE_TEMPLATE_ASSIGNMENT:
            {
                let {
                    id,
                    title,
                    criteriaIds,
                    assignmentId,
                    criteriaByIndex,
                    questionByIndex,
                    assignmentStatus,
                    questionAttachmentByIndex,
                    questionTypeByIndex,
                    scaleDefinitionByIndex,
                    uploadedDocumentByIndex,
                    questionTypeDefinitionsByIndex

                } = action;

                let newState = Object.assign({}, state, {
                    id,
                    title,
                    criteriaIds,
                    assignmentId,
                    criteriaByIndex,
                    questionByIndex,
                    assignmentStatus,
                    questionAttachmentByIndex,
                    questionTypeByIndex,
                    scaleDefinitionByIndex,
                    uploadedDocumentByIndex,
                    questionTypeDefinitionsByIndex
                });

                return newState;
            }

        case QUESTION_UPDATED:
            {
                let { question } = action;
                let { questionByIndex } = state;
                questionByIndex[question.id] = question;

                return { ...state, questionByIndex };

            }
        case CRITERIA_UPDATED:
            {
                let { criteria } = action;
                let { criteriaByIndex } = state;
                criteriaByIndex[criteria.id] = criteria;

                return { ...state, criteriaByIndex };

            }
        case DOCUMENT_UPLOAD_SUCCESS: {

            let { uploadedDocumentByIndex } = state;
            let document = uploadedDocumentByIndex[action.documentId];

            uploadedDocumentByIndex[action.documentId] =Object.assign({}, document, {
                status: UPLOAD_SUCCESS,
                progress: 100,
                referenceId:action.newDocumentId,
                referenceUrl:action.url
            });

            return { ...state, uploadedDocumentByIndex };
        }
        case DOCUMENT_UPLOAD_FAILED: {
            let { uploadedDocumentByIndex } = state;
            let document = uploadedDocumentByIndex[action.documentId];
            uploadedDocumentByIndex[action.documentId] = Object.assign({}, document, {
                status: UPLOAD_FAILED,
                progress: action.progress
            });

            return { ...state, uploadedDocumentByIndex };
        }
        case DOCUMENT_UPLOAD_IN_PROGRESS: {
            let { uploadedDocumentByIndex } = state;
            let document = uploadedDocumentByIndex[action.documentId];
            uploadedDocumentByIndex[action.documentId] = Object.assign({}, document, {
                status: UPLOAD_IN_PROGRESS,
                progress: action.progress
            });

            return { ...state, uploadedDocumentByIndex };
        }
        case DOCUMENTS_UPLOADING: {
            let { uploadedDocumentByIndex, questionByIndex } = state;

            action.documents.map((document) => {
                questionByIndex[action.questionId].uploadedDocuments.push(document.id);
                uploadedDocumentByIndex[document.id] =Object.assign({}, document, {
                    status: UPLOAD_IN_PROGRESS,
                    name: document.name,
                    progress: 15
                });
            });
            return { ...state, uploadedDocumentByIndex };
        }
        case DOCUMENT_DELETE: {
            let { uploadedDocumentByIndex, questionByIndex } = state;
            let { documentId, questionId } = action;
            let question = questionByIndex[questionId];
            question.uploadedDocuments = question.uploadedDocuments.filter(id => id!== documentId);

            delete uploadedDocumentByIndex[String(documentId)];
            questionByIndex[questionId] = question;
            return Object.assign({}, state, { uploadedDocumentByIndex, questionByIndex });
        }
        case ASSIGNMENT_SUBMITTED: {
            return { ...state };
        }

        case IS_BUSY:
            {
                state.isBusy = action.status;
                return Object.assign({}, state);
            }
        default:
            return state;
    }
}
