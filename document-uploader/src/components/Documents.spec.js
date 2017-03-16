import React from 'react';
import { shallow } from 'enzyme';
import Documents from './Documents';
import Document from './Document';
import { expect } from 'chai';

const setup = (props) => {
    const component = shallow(
        <Documents {...props} />
    );

    return { component };
};

const onFileRemove = () => true;

const files = [{
    id: 1, 
    attributes: {
        name: 'Mt Hood',
        preview: 'https://i.redd.it/90zxujjyv7wx.jpg',
        size: 15000,
        type: 'image/png',
        progress: 0,
        created: +new Date()
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
    }
}];

describe('Documents component: ', () => {
    it('should render 2 documents', () => {
        const { component } = setup({
            files,
            groupIndex: 1,
            preview: true,
            onFileRemove 
        });

        const nodes = component.find(Document);
        expect(nodes).to.have.lengthOf(2);

        nodes.map((document) => {
            expect(document.render()).to.be.ok;
        });
    });
});

