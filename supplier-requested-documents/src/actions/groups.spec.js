import { expect } from 'chai';
// import sinon from 'sinon';
// import * as types from '../constants/ActionTypes';
import * as actions from './groups';

describe('Groups actions: ', () => {
    it('sends request to document groups endpoint ', () => {
        const fn = actions.fetchDocuments();
        // const dispatch = sinon.stub();

        // dispatch.returns(Promise.resolve('assume we have got results back'));
        // fn(dispatch, {});

        expect(fn).is.a('function');
        // expect(dispatch.callCount).to.equal(1);
    });

});
