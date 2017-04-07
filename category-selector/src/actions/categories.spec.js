import { expect } from 'chai';
import sinon from 'sinon';
import * as types from '../constants/ActionTypes';
import * as actions from './categories';


describe('Categories actions: ', () => {
    it('selectType function should dispatch a select category action type', () => {
        const testCategory = {
            attributes: {
                title: 'Equipment'
            }
        };
        const fn = actions.selectType(testCategory);
        const resetSelectedTypes = actions.resetSelectedTypes();
        const dispatch = sinon.spy();
        fn(dispatch);

        expect(fn).is.a('function');
        expect(dispatch.callCount).to.equal(2);
        expect(dispatch.calledWith({ type: types.SELECT_CATEGORY_TYPE, categoryType: 'Equipment' })).to.equal(true);
        expect(dispatch.calledWith(resetSelectedTypes)).to.equal(true);
    });

    it('selectCategory function should dispatch 3 actions when there are subcategories', () => {
        const test = {
            id: 1,
            type: 'categories',
            attributes: {
                selectable: 1
            },
            relationships: {
                categories: {
                    data: [{
                        type: 'categories',
                        id: 2
                    }]
                }

            }
        };
        const fn = actions.selectCategory(test, 0);
        const dispatch = sinon.spy();
        const getState = sinon.spy();
        fn(dispatch, getState);

        expect(fn).is.a('function');
        expect(dispatch.callCount).to.equal(3);
        expect(dispatch.calledWith({ type: types.SELECT_CATEGORY, category: test, index: 0 })).to.equal(true);
    });

    it('selectCategory function should dispatch 3 action when there are no subcategories', () => {
        const test = {
            id: 1,
            type: 'categories',
            attributes: {
                selectable: 1
            }
        };
        const fn = actions.selectCategory(test, 1);
        const dispatch = sinon.spy();
        const getState = sinon.spy();
        fn(dispatch, getState);

        expect(fn).is.a('function');
        expect(dispatch.callCount).to.equal(3);
        expect(dispatch.calledWith({ type: types.SELECT_CATEGORY, category: test, index: 1 })).to.equal(true);
    });

    it('receiveCategories function should dispatch 2 actions when there are categories', () => {
        const type = 'test';
        const addDropDown = actions.addDropDown();
        const categories = {
            data: [{
                id: 1,
                type: 'categories',
                attributes: {
                    selectable: 1
                },
                relationships: {
                    categories: {
                        data: [{
                            type: 'categories',
                            id: 2
                        }]
                    }

                }
            }]
        };

        const fn = actions.receiveCategories(type, categories);
        const dispatch = sinon.spy();
        fn(dispatch);

        expect(fn).is.a('function');
        expect(dispatch.callCount).to.equal(2);
        expect(dispatch.calledWith({ type: types.RECEIVE_CATEGORIES, categoryType: type, categories })).to.equal(true);
        expect(dispatch.calledWith(addDropDown)).to.equal(true);
    });

    it('receiveCategories function should dispatch 1 actions when there no categories', () => {
        const type = 'test';
        const categories = {};
        const fn = actions.receiveCategories(type, categories);
        const dispatch = sinon.spy();
        fn(dispatch);

        expect(fn).is.a('function');
        expect(dispatch.callCount).to.equal(1);
        expect(dispatch.calledWith({ type: types.RECEIVE_CATEGORIES, categoryType: type, categories })).to.equal(true);
    });

    it('fetchCategoriesIfNeeded function should dispatch fetch categories action', () => {
        const categoryType = {
            attributes: {
                title: 'test'
            }
        };

        const state = {
            fetchedCategoryTypes: {}
        };

        const fn = actions.fetchCategoriesIfNeeded(categoryType);
        const getState = sinon.stub().returns(state);
        const addDropDown = actions.addDropDown();
        const dispatch = sinon.stub();
        dispatch.returns(Promise.resolve('assume we have got results back'));
        fn(dispatch, getState);

        expect(fn).is.a('function');
        expect(dispatch.callCount).to.equal(1);
        expect(dispatch.calledWith(addDropDown)).to.equal(false);
    });

    it('fetchCategoriesIfNeeded function should dispatch addDropDown action', () => {
        const categoryType = {
            attributes: {
                title: 'test'
            }
        };

        const state = {
            fetchedCategoryTypes: {
                test: {
                    categories: {
                        data: [1]
                    }
                }
            }
        };

        const fn = actions.fetchCategoriesIfNeeded(categoryType);
        const addDropDown = actions.addDropDown();
        const getState = sinon.stub().returns(state);
        const dispatch = sinon.spy();
        fn(dispatch, getState);

        expect(fn).is.a('function');
        expect(dispatch.callCount).to.equal(1);
        expect(dispatch.calledWith(addDropDown)).to.equal(true);
    });

    it('resetSelectedTypes function should reset default category selector state', () => {
        expect(actions.resetSelectedTypes()).to.deep.equal({
            type: types.SET_INITIAL_CATEGORY_SELECTOR_STATE
        });
    });

    it('requestCategories function should trigger request category action', () => {
        expect(actions.requestCategories('test')).to.deep.equal({
            type: types.REQUEST_CATEGORIES,
            categoryType: 'test'
        });
    });

    it('addDropDown function should trigger add dropdown action', () => {
        expect(actions.addDropDown(1)).to.deep.equal({
            type: types.ADD_DROPDOWN,
            index: 1
        });
    });
});
