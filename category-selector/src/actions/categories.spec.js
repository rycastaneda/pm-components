import * as types from '../constants/ActionTypes';
import * as actions from './categories';
import { expect } from 'chai';

describe('Categories actions: ', () => {
    it('selectType function should create a select categoryFilter action', () => {
        expect(actions.selectType('Equipment')).to.deep.equal({
            type: types.SELECT_CATEGORY_TYPE,
            filterType: 'Equipment'
        });
    });

    it('requestCategories function should create a request category action', () => {
        expect(actions.requestCategories('Equipment')).to.deep.equal({
            type: types.REQUEST_CATEGORIES,
            filterType: 'Equipment'
        });
    });
});

