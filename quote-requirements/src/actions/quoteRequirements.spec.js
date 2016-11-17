import { expect } from 'chai';
import sinon from 'sinon';
import * as types from '../constants/ActionTypes';
import * as actions from './quoteRequirements';

describe('Quote requirements actions: ', () => {
    it('setItemAsEditing function should change item\'s state to editing', () => {
        const item = { id: 'test' };

        expect(actions.setItemAsEditing(item)).to.deep.equal({
            type: types.IS_EDITING,
            id: 'test'
        });
    });

    it('handleTextChange function should update item\'s text', () => {
        const item = { id: 'test' };
        const text = 'some text';

        expect(actions.handleTextChange(item, text)).to.deep.equal({
            type: types.UPDATE_TEXT,
            id: 'test',
            text: 'some text'
        });
    });

    it('handleMandatorySelection function should update item\'s mandatory value', () => {
        const item = { id: 'test' };
        const mandatory = false;

        expect(actions.handleMandatorySelection(item, mandatory)).to.deep.equal({
            type: types.UPDATE_MANDATORY_SELECTION,
            id: 'test',
            mandatory: false
        });
    });

    it('handleInclusionsSelection function should update item\'s inclusions value', () => {
        const item = { id: 'test' };
        const include = true;

        expect(actions.handleInclusionsSelection(item, include)).to.deep.equal({
            type: types.UPDATE_INCLUSIONS_SELECTION,
            id: 'test',
            include: true
        });
    });

    it('handleCategoryInclusionChange function should update item\'s category_id value', () => {
        const item = { id: 'test' };
        const category_id = '44';

        expect(actions.handleCategoryInclusionChange(item, category_id)).to.deep.equal({
            type: types.UPDATE_INCLUSIONS_CATEGORY,
            id: 'test',
            'category_id': '44'
        });
    });

    it('requestRequirements function should dispatch items requested action', () => {
        expect(actions.requestRequirements()).to.deep.equal({
            type: types.REQUIREMENTS_REQUESTED
        });
    });

    it('addEmptyRequirement function should dispatch requested action', () => {
        expect(actions.addEmptyRequirement()).to.deep.equal({
            type: types.IS_EMPTY_ADDED
        });
    });


    it('receiveRequirements function should update items', () => {
        const items = [{ id: 'test' }];

        expect(actions.receiveRequirements(items)).to.deep.equal({
            type: types.REQUIREMENTS_RECEIVED,
            items: [{ id: 'test' }]
        });
    });




    // it('selectType function should dispatch a select category action type', () => {
    //     const testCategory = {
    //         attributes: {
    //             title: 'Equipment'
    //         }
    //     };
    //     const fn = actions.selectType(testCategory);
    //     const resetSelectedTypes = actions.resetSelectedTypes();
    //     const dispatch = sinon.spy();
    //     fn(dispatch);
    //
    //     expect(fn).is.a('function');
    //     expect(dispatch.callCount).to.equal(2);
    //     expect(dispatch.calledWith({ type: types.SELECT_CATEGORY_TYPE, categoryType: 'Equipment' })).to.equal(true);
    //     expect(dispatch.calledWith(resetSelectedTypes)).to.equal(true);
    // });
    //
    // it('selectCategory function should dispatch 2 actions when there are subcategories', () => {
    //     const test = {
    //         id: 1,
    //         type: 'categories',
    //         attributes: {
    //             selectable: 1
    //         },
    //         relationships: {
    //             categories: {
    //                 data: [{
    //                     type: 'categories',
    //                     id: 2
    //                 }]
    //             }
    //
    //         }
    //     };
    //     const fn = actions.selectCategory(test, 0);
    //     const dispatch = sinon.spy();
    //     const getState = sinon.spy();
    //     fn(dispatch, getState);
    //
    //     expect(fn).is.a('function');
    //     expect(dispatch.callCount).to.equal(2);
    //     expect(dispatch.calledWith({ type: types.SELECT_CATEGORY, category: test, index: 0 })).to.equal(true);
    // });
    //
    // it('selectCategory function should dispatch 1 action when there are no subcategories', () => {
    //     const test = {
    //         id: 1,
    //         type: 'categories',
    //         attributes: {
    //             selectable: 1
    //         }
    //     };
    //     const fn = actions.selectCategory(test, 1);
    //     const dispatch = sinon.spy();
    //     const getState = sinon.spy();
    //     fn(dispatch, getState);
    //
    //     expect(fn).is.a('function');
    //     expect(dispatch.callCount).to.equal(1);
    //     expect(dispatch.calledWith({ type: types.SELECT_CATEGORY, category: test, index: 1 })).to.equal(true);
    // });
    //
    // it('receiveCategories function should dispatch 2 actions when there are categories', () => {
    //     const type = 'test';
    //     const addDropDown = actions.addDropDown();
    //     const categories = {
    //         data: [{
    //             id: 1,
    //             type: 'categories',
    //             attributes: {
    //                 selectable: 1
    //             },
    //             relationships: {
    //                 categories: {
    //                     data: [{
    //                         type: 'categories',
    //                         id: 2
    //                     }]
    //                 }
    //
    //             }
    //         }]
    //     };
    //
    //     const fn = actions.receiveCategories(type, categories);
    //     const dispatch = sinon.spy();
    //     fn(dispatch);
    //
    //     expect(fn).is.a('function');
    //     expect(dispatch.callCount).to.equal(2);
    //     expect(dispatch.calledWith({ type: types.RECEIVE_CATEGORIES, categoryType: type, categories })).to.equal(true);
    //     expect(dispatch.calledWith(addDropDown)).to.equal(true);
    // });
    //
    // it('receiveCategories function should dispatch 1 actions when there no categories', () => {
    //     const type = 'test';
    //     const categories = {};
    //     const fn = actions.receiveCategories(type, categories);
    //     const dispatch = sinon.spy();
    //     fn(dispatch);
    //
    //     expect(fn).is.a('function');
    //     expect(dispatch.callCount).to.equal(1);
    //     expect(dispatch.calledWith({ type: types.RECEIVE_CATEGORIES, categoryType: type, categories })).to.equal(true);
    // });
    //
    // it('fetchCategoriesIfNeeded function should dispatch fetch categories action', () => {
    //     const categoryType = {
    //         attributes: {
    //             title: 'test'
    //         }
    //     };
    //
    //     const state = {
    //         fetchedCategoryTypes: {}
    //     };
    //
    //     const fn = actions.fetchCategoriesIfNeeded(categoryType);
    //     const getState = sinon.stub().returns(state);
    //     const addDropDown = actions.addDropDown();
    //     const dispatch = sinon.stub();
    //     dispatch.returns(Promise.resolve('assume we have got results back'));
    //     fn(dispatch, getState);
    //
    //     expect(fn).is.a('function');
    //     expect(dispatch.callCount).to.equal(1);
    //     expect(dispatch.calledWith(addDropDown)).to.equal(false);
    // });
    //
    // it('fetchCategoriesIfNeeded function should dispatch addDropDown action', () => {
    //     const categoryType = {
    //         attributes: {
    //             title: 'test'
    //         }
    //     };
    //
    //     const state = {
    //         fetchedCategoryTypes: {
    //             test: {
    //                 categories: {
    //                     data: [1]
    //                 }
    //             }
    //         }
    //     };
    //
    //     const fn = actions.fetchCategoriesIfNeeded(categoryType);
    //     const addDropDown = actions.addDropDown();
    //     const getState = sinon.stub().returns(state);
    //     const dispatch = sinon.spy();
    //     fn(dispatch, getState);
    //
    //     expect(fn).is.a('function');
    //     expect(dispatch.callCount).to.equal(1);
    //     expect(dispatch.calledWith(addDropDown)).to.equal(true);
    // });
    //
    // it('resetSelectedTypes function should reset default category selector state', () => {
    //     expect(actions.resetSelectedTypes()).to.deep.equal({
    //         type: types.SET_INITIAL_CATEGORY_SELECTOR_STATE
    //     });
    // });
    //
    // it('requestCategories function should trigger request category action', () => {
    //     expect(actions.requestCategories('test')).to.deep.equal({
    //         type: types.REQUEST_CATEGORIES,
    //         categoryType: 'test'
    //     });
    // });
    //
    // it('addDropDown function should trigger add dropdown action', () => {
    //     expect(actions.addDropDown(1)).to.deep.equal({
    //         type: types.ADD_DROPDOWN,
    //         index: 1
    //     });
    // });
});

