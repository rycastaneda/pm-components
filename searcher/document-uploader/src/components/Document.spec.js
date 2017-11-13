import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import {
  UPLOAD_IN_PROGRESS,
  UPLOAD_SUCCESS,
  UPLOAD_FAILED
} from '../constants';
import sinon from 'sinon';

import Document from './Document';
import Progress from './Progress';

const setup = (props) => {
    const component = mount(
        <Document {...props} />
    );

    return { component };
};

describe('Document component: ', () => {
    it('should render an document with delete button and download link', () => {
        const file = {
            name: 'Mt Hood.png',
            progress: 100,
            status: UPLOAD_SUCCESS,
            onFileRemove: () => true,
            onDownloadFile: () => true
        };
        const onFileRemove = sinon.spy(file.onFileRemove);
        const onDownloadFile = sinon.spy(file.onDownloadFile);

        const { component } = setup({ file, onFileRemove, onDownloadFile });

        expect(component.find('.document__filename').text()).to.equal('Mt Hood.png');

        component.find('.fa-times').simulate('click');
        expect(onFileRemove.calledOnce).to.equal(true);

        component.find('.fa-download').simulate('click');
        expect(onDownloadFile.calledOnce).to.equal(true);

        expect(component.find(Progress)).to.have.lengthOf(0);
    });

    it('should render a failed upload document', () => {
        const file = {
            name: 'Mt Hood.png',
            progress: 100,
            status: UPLOAD_FAILED,
            onFileRemove: () => true,
            onDownloadFile: () => true
        };

        const onFileRemove = sinon.spy(file.onFileRemove);
        const onDownloadFile = sinon.spy(file.onDownloadFile);

        const { component } = setup({ file, onFileRemove, onDownloadFile });

        const expectedMessage = 'Mt Hood.png - Something went wrong. Please try again';

        expect(component.find('.document__filename').text()).to.equal(expectedMessage);

        expect(component.find('.fa-times')).to.have.lengthOf(0);
        expect(component.find('.fa-download')).to.have.lengthOf(0);

        expect(component.find(Progress)).to.have.lengthOf(0);
    });

    it('should render an uploading document', () => {
        const file = {
            name: 'Mt Hood.png',
            progress: 50,
            status: UPLOAD_IN_PROGRESS,
            onFileRemove: () => true,
            onDownloadFile: () => true
        };

        const onFileRemove = sinon.spy(file.onFileRemove);
        const onDownloadFile = sinon.spy(file.onDownloadFile);

        const { component } = setup({ file, onFileRemove, onDownloadFile });

        expect(component.find('.document__filename').text()).to.equal('Mt Hood.png');

        expect(component.find('.fa-times')).to.have.lengthOf(0);
        expect(component.find('.fa-download')).to.have.lengthOf(0);

        expect(component.find(Progress).prop('status')).to.equal(UPLOAD_IN_PROGRESS);
    });
});
