import React from 'react';
import { shallow } from 'enzyme';
import Group from './Group';
import Documents from './Documents';
import { expect } from 'chai';

const setup = (props) => {
    const component = shallow(
        <Group {...props} />
    );

    return { component };
};

const group = {
    'type': 'document-groups',
    'id': '1',
    'attributes': {
        'title': 'Architectural Plan',
        'user_id': null,
        'updated_at': {
            'date': '2016-11-08 00:35:41.000000',
            'timezone_type': 3,
            'timezone': 'UTC'
        },
        'created_at': {
            'date': '2016-10-27 18:00:53.000000',
            'timezone_type': 3,
            'timezone': 'UTC'
        },
        'links': [{
            'rel': 'self',
            'uri': '/document-groups/4'
        }],
        'is_updating': false,
        'is_renaming': false
    }
};

const documents = [{
    id: 1, 
    attributes: {
        name: 'Mt Hood',
        preview: 'https://i.redd.it/90zxujjyv7wx.jpg',
        size: 15000,
        type: 'image/png',
        progress: 0,
        created: +new Date()
    },
    links: {
        self: 'https://i.redd.it/90zxujjyv7wx.jpg'
    }
}, {
    id: 2, 
    attributes: {
        name: 'Mt Hood',
        preview: 'https://i.redd.it/90zxujjyv7wx.jpg',
        size: 15000,
        type: 'image/png',
        progress: 0,
        created: +new Date()
    },
    links: {
        self: 'https://i.redd.it/90zxujjyv7wx.jpg'
    }
}];

describe('Group component: ', () => {
    it('should render with documents added', () => {
        const { component } = setup({
            group,
            preview: true,
            groupIndex: 1,
            documents,
            documentsAdded: []
        });

        expect(component.find('.panel-heading .pull-left').text()).to.eql(group.attributes.title);
        expect(component.find(Documents).render().find('.files')).to.be.ok;
    });

    it('should be able rename the group.', () => {
        const { component } = setup({
            group,
            preview: true,
            groupIndex: 1,
            documents,
            documentsAdded: []
        });

        expect(component.find('.fa-pencil')).to.be.ok;

        group.attributes.is_renaming = true;
        component.setProps({ group });

        // Save icon and cancel should be present
        expect(component.find('.group-panel__actions')).to.have.lengthOf(3);

        group.attributes.title = group.attributes.title + ' renamed';
        group.attributes.is_renaming = false;
        component.setProps({ group });

        expect(component.find('.pull-left').text()).to.eql(group.attributes.title);

    });

});

