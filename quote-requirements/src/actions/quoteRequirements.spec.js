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

    it('handleCategoryInclusionChange function should update item\'s category_id value', () => {
        const item = { id: 'test' };
        const category_id = '44';

        expect(actions.handleCategoryInclusionChange(item, true, category_id)).to.deep.equal({
            type: types.UPDATE_INCLUSIONS_CATEGORY,
            id: 'test',
            include: true,
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
});

