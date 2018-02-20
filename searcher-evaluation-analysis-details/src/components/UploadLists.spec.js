import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import UploadLists from './UploadLists';
import Upload from './Upload';
import mockEvaluation from '../mocks/evaluation.json';

const setup = props => {
    const component = shallow(<UploadLists {...props} />);

    return { component };
};

let uploads = mockEvaluation.included
    .filter(include => include.type === 'uploads')
    .map(upload => {
        return {
            id: upload.id,
            ...upload.attributes
        };
    });

describe('UploadLists component: ', () => {
    it('should render Upload components', () => {
        const { component } = setup({
            uploads
        });

        const nodes = component.find(Upload);
        expect(nodes).to.have.lengthOf(uploads.length);

        nodes.map(document => {
            expect(document.render()).to.be.ok;
        });
    });
});
