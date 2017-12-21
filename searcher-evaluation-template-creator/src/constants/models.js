

export const QUESTION_OPTIONS = [{ id:'scale', label:'Do you need to define the scale?' },
                                                                        { id:'upload', label:'Allow respondant to upload documents.' },
                                                                        { id:'comments', label:'Comments are mandatory.' }];

export const QUESTION_SKELETON = { id:null,
                                    title:'',
                                    isAllowUpload:false,
                                    isCommentRequired:false,
                                    isAllowScaleDefinitions:false,
                                    type: 0,
                                    scaleDefinitions:[],
                                    documentIds:[],
                                    isSaved:false,
                                    errorMessage:'' };

export const CRITERION_SKELETON = { id:null,
                                    questions:[],
                                    weight: '',
                                    title:'',
                                    isMaximised:true,
                                    isSaved:false,
                                    errorMessage:'' };
