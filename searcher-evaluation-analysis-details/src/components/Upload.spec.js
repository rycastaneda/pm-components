import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Upload from './Upload';

import mockEvaluation from '../mocks/evaluation.json';

let upload = mockEvaluation.included
    .filter(include => include.type === 'uploads')
    .map(upload => {
        return {
            id: upload.id,
            ...upload.attributes
        };
    })
    .pop();

const setup = props => {
    const component = shallow(<Upload {...props} />);

    return { component };
};

describe('Upload component: ', () => {
    it('should render title with download link', () => {
        const { component } = setup({
            title: upload.original_name,
            url: upload.download_url
        });

        expect(component.find('li').text()).to.equal(upload.original_name);
        expect(component.find('.download-icon').prop('href')).to.eql(
            upload.download_url
        );
    });
});
