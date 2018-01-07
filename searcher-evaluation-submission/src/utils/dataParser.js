import normalize from 'json-api-normalizer';
export function parseDataForUpdateQuestion(question) {
    let response_value = null;
    let { selectedDefinition, comment, id, type } = question;
    if (selectedDefinition!==null) {
        response_value =  Number(selectedDefinition);
    }
    let result = {
        data:{
            type:'evaluation-question-responses',
            attributes:{
                response_value,
                comment
            },
            relationships:{
                question:{
                    data:{
                        type:'evaluation-questions',
                        id:Number(id)
                    }
                },
                type: {
                    data:{
                        type:'evaluation-question-types',
                        id:Number(type)
                    }
                }
            }
        }
    };
    // id is not required if it is a question response creation.
    if (question.responseId) {
        result.data.id = question.responseId;
    }
    return result;
}

export function parseInitialize(data, assignmentId) {
    let result = { assignmentId };
    let { evaluationTemplateAssignments,
        evaluationTemplates,
        evaluationCriteria,
        evaluationQuestions,
        evaluationQuestionTypes,
        evaluationQuestionResponses,
        evaluationQuestionTypeDefinitions,
        evaluationQuestionScaleDefinitions,
        evaluationTemplateAssignmentStatuses,
        uploads } = normalize(data);

    evaluationTemplateAssignments = evaluationTemplateAssignments[assignmentId];
    result.id = evaluationTemplateAssignments.relationships.template.data.id;
    evaluationTemplates = evaluationTemplates[result.id];
    let assignmentStatus = evaluationTemplateAssignments.relationships.assignmentStatus.data.id;
    assignmentStatus = evaluationTemplateAssignmentStatuses[assignmentStatus];
    result.assignmentStatus = { id:assignmentStatus.id, title:assignmentStatus.attributes.title };
    result.title = evaluationTemplates.attributes.title;
    result.criteriaIds = evaluationTemplates.relationships.criteria.data.map(item => item.id);
    result.criteriaByIndex = {};
    if (evaluationCriteria) {
        Object.values(evaluationCriteria).forEach((item) => {
            let { id, attributes, relationships } = item;
            let { title, weight } = attributes;
            let isMaximised = true;
            let questions = relationships.questions.data.map(item => item.id);
            result.criteriaByIndex[String(id)] = { id, title, weight, questions, isMaximised };
        });
    }
    result.questionByIndex = {};
    if (evaluationQuestions) {
        Object.values(evaluationQuestions).forEach((item) => {
            let { id, attributes, relationships } = item;
            let { text, allowDocuments, enableScaleDefinitions, mandatoryComments, sortOrder } = attributes;
            let title = text;
            let {  documents, type } = relationships;
            type = type.data.id;
            let scaleDefinitions = [];
            let questionAttachments =[];
            if (documents) {
                questionAttachments = documents.data.map(item => item.id);
            }

            if (enableScaleDefinitions === 1) {
                let { definitions } = relationships;
                definitions = definitions.data;
                scaleDefinitions = definitions.map(item => item.id);
            }

            result.questionByIndex[String(id)] = {
                id,
                title,
                type,
                allowDocuments,
                enableScaleDefinitions,
                mandatoryComments,
                sortOrder,
                questionAttachments,
                uploadedDocuments:[],
                responseId:null,
                comment:'',
                scaleDefinitions,
                selectedDefinition:null,
                isAttempted:false
            };
        });
    }

    result.scaleDefinitionByIndex = {};
    if (evaluationQuestionScaleDefinitions) {
        Object.values(evaluationQuestionScaleDefinitions).forEach((item) => {
            let { id, attributes, relationships } = item;
            let { score, definition } = attributes;
            let typeDefinitionId = relationships.typeDefinition.data.id;
            result.scaleDefinitionByIndex[String(id)] = { id, score, definition, typeDefinitionId };
        });
    }

    result.questionTypeDefinitionsByIndex = {};
    if (evaluationQuestionTypeDefinitions) {
        Object.values(evaluationQuestionTypeDefinitions).forEach((item) => {
            let { id, attributes } = item;
            let { title, value } = attributes;
            result.questionTypeDefinitionsByIndex[String(id)] = { id, title, value };
        });
    }

    result.questionTypeByIndex = {};
    if (evaluationQuestionTypes) {
        Object.values(evaluationQuestionTypes).forEach((item) => {
            let { id, attributes, relationships } = item;
            let { title, active, description } = attributes;
            let definitions = relationships.definitions.data.map(item => item.id);
            result.questionTypeByIndex[String(id)] = { id, title, active, description, definitions };
        });
    }

    if (evaluationQuestionResponses) {
        Object.values(evaluationQuestionResponses).forEach((item) => {
            let questionId = item.relationships.question.data.id;
            let question = result.questionByIndex[String(questionId)];
            question.comment = item.attributes.comment;
            question.selectedDefinition = String(item.attributes.responseValue);
            question.isAttempted = true;
            question.responseId = item.id;
            if (item.relationships.documents.data.length) {
                question.uploadedDocuments = item.relationships.documents.data.map(item => item.id);
            }
        });
    }
    result.uploadedDocumentByIndex = {};
    if (uploads) {
        Object.values(uploads).forEach((item) => {
            let { id, attributes } = item;
            let { downloadUrl, originalName } = attributes;
            let status = 'success';
            let progress = 100;
            let referenceId = id;
            result.uploadedDocumentByIndex[String(id)] = { id, name:originalName, referenceUrl:downloadUrl, status, progress, referenceId };
        });
    }
    return result;
}
