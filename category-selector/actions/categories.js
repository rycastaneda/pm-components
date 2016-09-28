import { SELECT_CATEGORY, SELECT_CATEGORY_FILTER, REQUEST_CATEGORIES, RECEIVE_CATEGORIES } from '../constants/ActionTypes';
// import { readEndpoint } from 'redux-json-api';
import _categories from '../mocks/categories.json';


function requestCategories(filter) {
    return {
        type: REQUEST_CATEGORIES,
        filter
    };
}

function receiveCategories(filter, categories) {
    return {
        type: RECEIVE_CATEGORIES,
        categories,
        // categories: categories.map(child => child),
        filter
    };
}

function fetchCategories(categoryFilter) {
    return (dispatch) => {
        const filterName = categoryFilter.attributes.title;

        dispatch(requestCategories(filterName));
        return dispatch(receiveCategories(filterName, _categories.data));

        // return dispatch(readEndpoint(`api/users/`))
        //     .then(response => response)
        //     .then(json => dispatch(getCategories(json)));
    };
}

function shouldFetchCategories(state, categoryFilter) {
    const categoryList = state.fetchedCategoriesByFilter[categoryFilter];
    if (!categoryList) return true;
    else if (categoryList.isFetching) return false;
    else return; // some error console.log('terrr');
}

export function fetchCategoriesIfNeeded(categoryFilter) {
    return (dispatch, getState) => {
        if (shouldFetchCategories(getState(), categoryFilter)) {
            return dispatch(fetchCategories(categoryFilter));
        }
    };
}

export function selectCategoryFilter(filterName) {
    return {
        type: SELECT_CATEGORY_FILTER,
        filterName
    };
}



export function selectCategory(suggestion, index) {
    return (dispatch, getState) => {
        const categoryFilter = getState().selectedCategoryFilter;
        dispatch(triggerCategory(suggestion, categoryFilter, index));
        console.log(getState());
        console.log('sssss');
    };

}

function triggerCategory(suggestion, filter, index) {
    return {
        type: SELECT_CATEGORY,
        category: suggestion,
        index,
        filter
    };

}