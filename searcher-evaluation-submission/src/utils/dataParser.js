import normalize from 'json-api-normalizer';
export function parseInitialize(data, templateIndex) {
    templateIndex =1;
    window.console.log('response->', normalize(data));
    let { evaluationTemplates,
        evaluationCriteria,
        evaluationQuestions,
        evaluationQuestionTypes,
        evaluationQuestionResponses,
        evaluationQuestionTypeDefinitions,
        evaluationQuestionScaleDefinitions } = normalize(data);

    evaluationTemplates = evaluationTemplates[templateIndex];

    let result ={};

    result.id = evaluationTemplates.id;
    result.title = evaluationTemplates.attributes.title;
    result.criteriaIds = evaluationTemplates.relationships.criteria.data.map(item => item.id);

    result.criteriaByIndex = {};

    Object.values(evaluationCriteria).forEach((item) => {
        let { id, attributes, relationships } = item;
        let { title, weight } = attributes;
        let questions = relationships.questions.data.map(item => item.id);
        result.criteriaByIndex[String(id)] = { id, title, weight, questions };
    });

    result.questionByIndex = {};

    Object.values(evaluationQuestions).forEach((item) => {

        let { id, attributes, relationships } = item;
        let { text, allowDocuments, enableScaleDefinitions, mandatoryComments, sortOrder } = attributes;
        let title = text;
        let { definitions, documents, type } = relationships;
        let scaleDefinitions = [];
        definitions = definitions.data;
        documents = documents.data.map(item => item.id);
        type = type.data.id;
        if (enableScaleDefinitions) {
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
            definitions,
            documents,
            comment:'',
            scaleDefinitions,
            selectedDefinition:null
        };
    });

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
    });
    result.attachmentByIndex ={};


    window.console.log('dummy->', {
        criteriaByIndex:{
            experience:{ id:'experience', title: 'Experience', weight:'30', questions:['1', '2', '3']
           }
        },
        questionByIndex: {
            '1':{
                id:'1',
                title:'Has the tenderer demonstrated experience in successfully delivering similar work?',
                scaleDefinitions:['1', '2', '3', '4', '5'],
                documents:['0', '1', '2'],
                droppedDocuments:[],
                mandatoryComments: true,
                allowDocuments : true,
                enableScaleDefinitions: true,
                questionType: 1
            },
            '2':{
                id:'2',
                label:'The tenderer has demonstrated experience in successfully delivering similar work?',
                scaleDefinitions:['6', '7'],
                documents:['0'],
                droppedDocuments:[],
                mandatoryComments: true,
                allowDocuments: false,
                enableScaleDefinitions: false,
                questionType: 3
            },
            '3': {
                id:'3',
                label:'Has the tenderer demonstrated experience in successfully delivering similar work?',
                scaleDefinitions:['8', '9', '10', '11', '12', '13'],
                documents:[
                ],
                droppedDocuments:[],
                mandatoryComments: false,
                allowDocuments: true,
                enableScaleDefinitions: false,
                questionType: 2
            }
        },
        attachmentByIndex: {
            '0': { id:'0', label:'project-specs.pdf', url:'/Attachment' },
            '1':{ id:'1', label:'map-of-bundy.jpg', url:'/Attachment' },
            '2':{ id:'2', label:'key-outcome.xls', url:'/Attachment' }
        },
        scaleDefinitionByIndex:{
            '0':{ id:'0', label: 'The tenderer is beyond terrible', score:0 },
            '1':{ id:'1', label: 'The tenderer has completed work to a poor standard', score:1 },
            '2':{ id:'2', label: 'The tenderer has never completed similar work', score:2 },
            '3':{ id:'3', label: 'The tenderer has completed 1 similar project to an acceptable standard', score:3 },
            '4':{ id:'4', label: 'The tenderer has completed more than 1 project to an acceptable standard', score:4 },
            '5':{ id:'5', label: 'The tenderer has completed many similar projects to an exemplary standard', score:5 },
            '6':{ id:'6', label: 'Yes' },
            '7':{ id:'7', label: 'No' },
            '8':{ id:'8', score:0, selected:false },
            '9':{ id:'9', score:1, selected:false },
            '10':{ id:'10', score:2, selected:false },
            '11':{ id:'11', score:3, selected:false },
            '12':{ id:'12', score:4, selected:false },
            '13':{ id:'13', score:5, selected:false }
        },
        criteriaIds:['experience'],
        questionIds:['1', '2', '3'],
        attachmentIds:['0', '1', '2'],
        scaleDefinitionIds: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13']
    });
    return result;
}
