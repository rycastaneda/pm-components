export function getSectionsFromService(data) {
    window.console.log(data);
    return {
        sections:{ experience:{ id:'experience', label: 'Experience', weighting:'30', questionnaire:[{
            id:1,
            label:'Has the tenderer demonstrated experience in successfully delivering similar work?',
            type: 'vertical-scale',
            options:[
                { id:0, label: 'The tenderer is beyond terrible', score:1 },
                { id:1, label: 'The tenderer has completed work to a poor standard', score:2 },
                { id:2, label: 'The tenderer has never completed similar work', score:3 },
                { id:3, label: 'The tenderer has completed 1 similar project to an acceptable standard', score:4 },
                { id:4, label: 'The tenderer has completed more than 1 project to an acceptable standard', score:5 },
                { id:5, label: 'The tenderer has completed many similar projects to an exemplary standard', score:6 }
            ],
            attachments:[
                { id:0, label:'project-specs.pdf', url:'/Attachment' },
                { id:1, label:'map-of-bundy.jpg', url:'/Attachment' },
                { id:2, label:'key-outcome.xls', url:'/Attachment' }
            ],
            comments: true
        },
        {
            id:2,
            label:'The tenderer has demonstrated experience in successfully delivering similar work?',
            type: 'multiple-choice',
            options:[
                { id:0, label: 'Yes' },
                { id:1, label: 'No' }

            ],
            attachments:[
                { id:0, label:'project-specs.pdf', url:'/Attachment' },
                { id:1, label:'map-of-bundy.jpg', url:'/Attachment' },
                { id:2, label:'key-outcome.xls', url:'/Attachment' }
            ],
            comments: true
        },
        {
            id:3,
            label:'Has the tenderer demonstrated experience in successfully delivering similar work?',
            type: 'vertical-scale',
            options:[
                { id:0, label: 'The tenderer is beyond terrible', score:1 },
                { id:1, label: 'The tenderer has completed work to a poor standard', score:2 },
                { id:2, label: 'The tenderer has never completed similar work', score:3 },
                { id:3, label: 'The tenderer has completed 1 similar project to an acceptable standard', score:4 },
                { id:4, label: 'The tenderer has completed more than 1 project to an acceptable standard', score:5 },
                { id:5, label: 'The tenderer has completed many similar projects to an exemplary standard', score:6 }
            ],
            attachments:[
                { id:0, label:'project-specs.pdf', url:'/Attachment' },
                { id:1, label:'map-of-bundy.jpg', url:'/Attachment' },
                { id:2, label:'key-outcome.xls', url:'/Attachment' }
            ]
        }
        ]
       }
     },
        sectionsIds:['experience']
    };
}
