// import { expect } from 'chai';
import sinon from 'sinon';
// import * as types from '../constants/ActionTypes';
import * as actions from './configureTagsActions';

describe('Configure Tags actions: ', () => {


    it('setIsActiveForTag should call webservice and dispatch response', () => {

        const fn = actions.saveTag({ id:1, iconClass:'fa-tag', color:'#000', title:'', description:'', 
        isActive:true, isEdited:true });
        const dispatch = sinon.spy();
        const getState = sinon.stub().returns({ response:{ data:{ data:{ id:1 } } } });

        fn(dispatch, getState);
        // INCOMPLETE
        // Dispatch is called with the correct state
        // expect(dispatch.calledWith({ type: types.REQUEST_FAILED, message:'' })).to.equal(true);
        // expect(dispatch.callCount).to.equal(1);
    });
});
