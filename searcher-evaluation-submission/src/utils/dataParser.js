import normalize from 'json-api-normalizer';

export function parseDataForUpdateQuestion(question) {

    return {
        data:{
            type:'evaluation-question-responses',
            attributes:{
                response_value:question.selectedDefinition,
                comment:question.comment
            },
            relationships:{
                question:{
                    data:{
                        type:'evaluation-questions',
                        id:Number(question.id)
                    }
                },
                questionType: {
                    data:{
                        type:'evaluation-question-types',
                        id:Number(question.type)
                    }
                }
            }
        }
    };

}
export function parseInitialize(data, assignmentId) {
    assignmentId = 1;
    let result ={ assignmentId };
    let { evaluationTemplateAssignments,
        evaluationTemplates,
        evaluationCriteria,
        evaluationQuestions,
        evaluationQuestionTypes,
        evaluationQuestionResponses,
        evaluationQuestionTypeDefinitions,
        evaluationQuestionScaleDefinitions,
        evaluationTemplateAssignmentStatuses } = normalize(data);

    evaluationTemplateAssignments = evaluationTemplateAssignments[assignmentId];

    result.id = evaluationTemplateAssignments.relationships.template.data.id;
    evaluationTemplates = evaluationTemplates[result.id];

    let assignmentStatus = evaluationTemplateAssignments.relationships.assignmentStatus.data.id;

    assignmentStatus = evaluationTemplateAssignmentStatuses[assignmentStatus];

    result.assignmentStatus = { id:assignmentStatus.id, title:assignmentStatus.attributes.title };

    result.title = evaluationTemplates.attributes.title;
    result.criteriaIds = evaluationTemplates.relationships.criteria.data.map(item => item.id);
    result.criteriaByIndex = {};

    Object.values(evaluationCriteria).forEach((item) => {
        let { id, attributes, relationships } = item;
        let { title, weight } = attributes;
        let isMaximised = true;
        let questions = relationships.questions.data.map(item => item.id);
        result.criteriaByIndex[String(id)] = { id, title, weight, questions, isMaximised };
    });

    result.questionByIndex = {};

    Object.values(evaluationQuestions).forEach((item) => {
        let { id, attributes, relationships } = item;
        let { text, allowDocuments, enableScaleDefinitions, mandatoryComments, sortOrder } = attributes;
        let title = text;
        let {  documents, type } = relationships;
        type = type.data.id;
        let scaleDefinitions = [];

        if (documents) {
            documents = documents.data.map(item => item.id);
        } else {
            documents =[];
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
            documents,
            uploadedDocuments:[],
            responseId:null,
            comment:'',
            scaleDefinitions,
            selectedDefinition:null,
            isAttempted:false
        };

    });
    result.uploadedDocumentByIndex={};
    result.scaleDefinitionByIndex = {};
    Object.values(evaluationQuestionScaleDefinitions).forEach((item) => {
        let { id, attributes, relationships } = item;
        let { score, definition } = attributes;
        let typeDefinitionId = relationships.typeDefinition.data.id;
        result.scaleDefinitionByIndex[String(id)] = { id, score, definition, typeDefinitionId };
    });

    result.questionTypeDefinitionsByIndex = {};
    Object.values(evaluationQuestionTypeDefinitions).forEach((item) => {
        let { id, attributes } = item;
        let { title, value } = attributes;
        result.questionTypeDefinitionsByIndex[String(id)] = { id, title, value };
    });

    result.questionTypeByIndex = {};

    Object.values(evaluationQuestionTypes).forEach((item) => {
        let { id, attributes, relationships } = item;
        let { title, active, description } = attributes;
        let definitions = relationships.definitions.data.map(item => item.id);
        result.questionTypeByIndex[String(id)] = { id, title, active, description, definitions };
    });

    Object.values(evaluationQuestionResponses).forEach((item) => {
        let questionId = item.relationships.question.data.id;
        let question = result.questionByIndex[String(questionId)];
        question.comment = item.attributes.comment;
        question.selectedDefinition = item.attributes.responseValue;
        question.isAttempted = true;
        question.responseId = item.id;
    });

    result.attachmentByIndex = {};
    return result;
}
