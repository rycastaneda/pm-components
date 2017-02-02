import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import GroupList from './GroupList';

const setup = (props) => {
    const component = shallow(
        <GroupList {...props} />
    );

    return { component };
};

const downloadDocumentGroup = () => true;

const group = {
    type: 'document-groups',
    id: '1',
    attributes: {
        title: 'Scope of Works',
        user_id: null,
        quote_id: null,
        'default': 1,
        updated_at: {
            date: '2016-12-07 04:49:45.000000',
            timezone_type: 3,
            timezone: 'UTC'
        },
        created_at: {
            date: '2016-10-27 18:00:53.000000',
            timezone_type: 3,
            timezone: 'UTC'
        },
        links: [{
            rel: 'self',
            uri: '/document-groups/1'
        }]
    },
    links: {
        self: 'https://api.pm.local.dev/document-groups/1'
    }
};

describe('GroupList component: ', () => {
    it('should render title with download link', () => {
        const { component } = setup({
            group,
            downloadDocumentGroup 
        });

        expect(component.find('li').text()).to.equal(group.attributes.title);
        expect(component.find('a.fa.fa-download')).to.be.ok;
    });


});

