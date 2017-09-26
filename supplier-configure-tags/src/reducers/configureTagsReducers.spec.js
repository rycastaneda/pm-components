import { expect } from 'chai';
import { configureTags } from './configureTagsReducers';
import { REQUEST_FAILED, ALL_TAGS_UPDATE, TAG_EDIT_START } from '../constants/ActionTypes';
describe('configureTag reducer', () => {
    it('should handle default state', () => {
        expect(configureTags(undefined, {})).to.deep.equal({ availableTags:[], errorMessage:null });
    });

    it('should handle REQUEST_FAILED', () => {
        expect(configureTags({ availableTags:[], errorMessage:null }, { type:REQUEST_FAILED, message:'www' }).errorMessage).to.not.be.null;
    });

    it('should handle ALL_TAGS_UPDATE', () => {
        expect(configureTags({ availableTags:[], errorMessage:null }, { type:ALL_TAGS_UPDATE, availableTags:[{ iconClass:'fa-tag', color:'#000', title:'', description:'', id:33, isActive:true }] }).availableTags).to.have.lengthOf(1);
    });

    it('should handle TAG_EDIT_START', () => {
        expect(configureTags({ availableTags:[{ iconClass:'fa-tag', color:'#000', title:'', description:'', id:33, isActive:true, isEdited:false, previous:null }], errorMessage:null }, { type:TAG_EDIT_START, id:33 }).availableTags).to.deep.equal([{ iconClass:'fa-tag', color:'#000', title:'', description:'', id:33, isActive:true, isEdited:true, previous:{ iconClass:'fa-tag', color:'#000', title:'', description:'', id:33, isActive:true, isEdited:false, previous:null } }]);
    });
});
