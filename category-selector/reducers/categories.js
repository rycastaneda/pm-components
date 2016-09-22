export default function categories(state = [], action) {

    if (action.type === 'ADD') {
        return state.concat([ action.text ]);
    }
    else {
        return state
    }

}