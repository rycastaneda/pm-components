import React from 'react';
import { shallow } from 'enzyme';
import RequirementsList from './RequirementsList';
import ViewForm from '../containers/ViewForm';
import EditForm from '../containers/EditForm';
import { expect } from 'chai';

describe('RequirementsList component: ', () => {
    it('should edit form and view form correctly', () => {
        const handleUpdate = () => true;
        const handleDelete = () => true;
        const list = [
            { isEditing: true, attributes: { text: '' } },
            { isEditing: false, attributes: { text: '' } }
        ];

        const component = shallow(
            <RequirementsList list={list}
                              handleDelete={handleDelete} h
                              andleUpdate={handleUpdate}/>
        );

        expect(component.node.type).to.equal('div');
        expect(component.find(ViewForm)).to.have.length(1);
        expect(component.find(EditForm)).to.have.length(1);
    });
});
