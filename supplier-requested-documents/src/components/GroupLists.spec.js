import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import GroupLists from './GroupLists';
import GroupList from './GroupList';

const setup = (props) => {
    const component = shallow(
        <GroupLists {...props} />
    );

    return { component };
};

const downloadDocumentGroup = () => true;

const groups = [{
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
}, {
    type: 'document-groups',
    id: '2',
    attributes: {
        title: 'Specifications',
        user_id: null,
        quote_id: null,
        default: 1,
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
}];

describe('GroupLists component: ', () => {
    it('should render GroupList components', () => {
        const { component } = setup({
            groups,
            downloadDocumentGroup 
        });

        const nodes = component.find(GroupList);
        expect(nodes).to.have.lengthOf(2);

        nodes.map((document) => {
            expect(document.render()).to.be.ok;
        });
    });
});

