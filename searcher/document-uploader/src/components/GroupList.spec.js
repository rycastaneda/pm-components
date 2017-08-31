import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import GroupList from './GroupList';
import sinon from 'sinon';

const setup = (props) => {
    const component = shallow(
        <GroupList {...props} />
    );

    return { component };
};

const group = {
    id: '1',
    title: 'Scope of Works'
};

describe('GroupList component: ', () => {
    it('should render title with download link', () => {
        const downloadDocumentGroup = sinon.spy(() => true);

        const { component } = setup({
            group,
            downloadDocumentGroup
        });

        expect(component.find('li').text()).to.equal(group.title);
        component.find('.download-icon').simulate('click');
        expect(downloadDocumentGroup.calledOnce).to.equal(true);
    });
});
