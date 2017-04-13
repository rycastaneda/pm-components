import React from 'react';
import { shallow } from 'enzyme';
import Documents from './Documents';
import Document from './Document';
import { expect } from 'chai';
import {
  UPLOAD_IN_PROGRESS,
  UPLOAD_SUCCESS,
  UPLOAD_FAILED
} from '../constants';

const setup = (props) => {
    const component = shallow(
        <Documents {...props} />
    );

    return { component };
};


const files = [{
    id: 1,
    name: 'Mt Hood.png',
    progress: 50,
    status: UPLOAD_SUCCESS
}, {
    id: 2,
    name: 'Mt Hood.png',
    progress: 50,
    status: UPLOAD_IN_PROGRESS
}];

describe('Documents component: ', () => {
    it('should render multiple documents', () => {
        const onFileRemove = () => true;
        const onDownloadFile = () => true;

        const { component } = setup({
            files,
            onFileRemove,
            onDownloadFile
        });

        const nodes = component.find(Document);
        expect(nodes).to.have.lengthOf(2);

        nodes.map((document) => {
            expect(document.render()).to.be.ok;
        });
    });
});
