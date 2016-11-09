import React from 'react';
import { shallow } from 'enzyme';
import Document from './Document';
import { expect } from 'chai';

const setup = (props) => {
    const component = shallow(
        <Document {...props} />
    );

    return { component };
};

const onFileRemove = () => true;

const file = {
    id: 1, 
    attributes: {
        name: 'Mt Hood',
        preview: 'https://i.redd.it/90zxujjyv7wx.jpg',
        size: 15000,
        type: 'image/png',
        progress: 0,
        created: +new Date()
    }
};

describe('Document component: ', () => {
    it('should render an image on a preview setup', () => {
        const { component } = setup({
            file,
            preview: true,
            groupIndex: 1,
            onFileRemove 
        });

        expect(component.find('img').prop('src')).to.equal(file.attributes.preview);
        expect(component.find('.document__filename').text()).to.equal('Mt Hood');
        expect(component.find('.document__filesize').text()).to.equal('14.65 KB');
        expect(component.find('.document__timestamp').text()).to.equal('a few seconds ago');
    });

    it('should show the remove icon on preview setup', () => {
        const { component } = setup({
            file,
            preview: true,
            groupIndex: 1,
            onFileRemove 
        });

        expect(component.find('.document__remove-icon')).to.be.ok;
    });

    it('should render an attachment icon if file is not image', () => {

        file.attributes.type = 'file/';

        const { component } = setup({
            file,
            preview: true,
            groupIndex: 1,
            onFileRemove 
        });

        expect(component.find('.document__thumb').prop('className')).to.have.string('fa-file-o');
    });
});

