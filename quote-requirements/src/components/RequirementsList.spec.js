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
            { id: 1, isEditing: true, attributes: { text: '' } },
            { id: 2, isEditing: false, attributes: { text: '' } }
        ];

        const component = shallow(
            <RequirementsList list={list}
                              handleDelete={handleDelete}
                              handleUpdate={handleUpdate}/>
        );

        expect(component.node.type).to.equal('div');
        expect(component.find(ViewForm)).to.have.length(1);
        expect(component.find(EditForm)).to.have.length(1);
    });
});
