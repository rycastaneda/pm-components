export const QUESTION_TYPES= [{ type:'scale_five', label:'Scale (1 to 5)', maxOptionDefinitions:5 },
                                                                    { type:'scale_ten', label:'Scale (1 to 10)', maxOptionDefinitions:10 },
                                                                    { type:'boolean', label:'Yes/No', maxOptionDefinitions:2 },
                                                                    { type:'free_text', label:'Free Text', maxOptionDefinitions:0 }];

export const QUESTION_OPTIONS = [{ id:'scale', label:'Do you need to define the scale' },
                                                                        { id:'upload', label:'Allow respondant to upload documents' },
                                                                        { id:'comments', label:'Comments are mandatory' }];

export const QUESTION_SKELETON = { id:null,
                                                                            title:'',
                                                                            isAllowUpload:false,
                                                                            isCommentRequired:false,
                                                                            isAllowScaleDefinitions:false,
                                                                            isMaximised:true,
                                                                            typeId: 'scale_five',
                                                                            scaleDefinitions:[] };

export const CRITERION_SKELETON = { id:null,
                                                                                questions:[],
                                                                                weight: '',
                                                                                title:'',
                                                                                isMaximised:true };
