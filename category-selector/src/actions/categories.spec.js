import * as types from '../constants/ActionTypes';
import * as actions from './categories';
import { expect } from 'chai';

describe('Categories actions: ', () => {
    it('selectCategoryFilter function should create a select categoryFilter action', () => {
        expect(actions.selectCategoryFilter('Equipment')).to.deep.equal({
            type: types.SELECT_CATEGORY_FILTER,
            filterName: 'Equipment'
        });
    });

    it('requestCategories function should create a request category action', () => {
        expect(actions.requestCategories('Equipment')).to.deep.equal({
            type: types.REQUEST_CATEGORIES,
            filterName: 'Equipment'
        });
    });
});

