export function getSectionsFromService(data) {
    window.console.log(data);
    return {
        sections:{ experience:{ id:'experience', label: 'Experience', weighting:'30', questionnaire:[{
            id:1,
            label:'Has the tenderer demonstrated experience in successfully delivering similar work?',
            options:[
                { id:0, label: 'The tenderer is beyond terrible', score:0 },
                { id:1, label: 'The tenderer has completed work to a poor standard', score:1 },
                { id:2, label: 'The tenderer has never completed similar work', score:2 },
                { id:3, label: 'The tenderer has completed 1 similar project to an acceptable standard', score:3 },
                { id:4, label: 'The tenderer has completed more than 1 project to an acceptable standard', score:4 },
                { id:5, label: 'The tenderer has completed many similar projects to an exemplary standard', score:5 }
            ],
            attachments:[
                { id:0, label:'project-specs.pdf', url:'/Attachment' },
                { id:1, label:'map-of-bundy.jpg', url:'/Attachment' },
                { id:2, label:'key-outcome.xls', url:'/Attachment' }
            ],
            mandatory_comments: true,
            allow_documents: true,
            enable_scale_definitions: true,
            question_type: 1
        },
        {
            id:2,
            label:'The tenderer has demonstrated experience in successfully delivering similar work?',
            options:[
                { id:0, label: 'Yes' },
                { id:1, label: 'No' }

            ],
            attachments:[
                { id:0, label:'project-specs.pdf', url:'/Attachment' }
            ],
            mandatory_comments: true,
            allow_documents: false,
            enable_scale_definitions: false,
            question_type: 3
        },
        {
            id:3,
            label:'Has the tenderer demonstrated experience in successfully delivering similar work?',
            options:[
                { id:0, score:0, selected:false },
                { id:1, score:1, selected:false },
                { id:2, score:2, selected:false },
                { id:3, score:3, selected:false },
                { id:4, score:4, selected:false },
                { id:5, score:5, selected:false }
            ],
            attachments:[
            ],
            mandatory_comments: false,
            allow_documents: true,
            enable_scale_definitions: false,
            question_type: 2
        }
        ]
       }
     },
        sectionsIds:['experience']
    };
}
