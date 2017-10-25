import * as actions from '../constants';
import { includes } from 'lodash';
const INITIAL_STATE = { 
    bySectionId: {},
    byId: {},
    allIds: []
};

export function questions(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actions.RECEIVE_QUESTIONS:
            return receiveQuestions(state, action);
        default:
            return state;
    }
}

function receiveQuestions(state, action) {
    const {
        byId,
        bySectionId,
        allIds
    } = state; 

    action.questions.data.map((question) => {
        byId[question.id] = { 
            ...question, 
            question: question.attributes.label,
            answer: question.attributes.value
        };

        if (!includes(allIds, question.id)) {
            allIds.push(question.id);  
        } 

        if (bySectionId[question.attributes.section_id] && 
            !includes(bySectionId[question.attributes.section_id], question.id)
        ) {
            return bySectionId[question.attributes.section_id].push(question.id);
        } 

        bySectionId[question.attributes.section_id] = [question.id];

    });

    return {
        bySectionId,
        byId,
        allIds
    };
}

