import React from 'react';
import { shallow } from 'enzyme';
import Progress from './Progress';
import { expect } from 'chai';
import { UPLOAD_IN_PROGRESS, UPLOAD_SUCCESS, UPLOAD_FAILED } from '../constants';

const setup = (props) => {
    const component = shallow(
        <Progress {...props} />
    );

    return { component };
};

describe('Progress component: ', () => {
    it('should show uploading status state and has 20% progress', () => {
        const { component } = setup({
            status: UPLOAD_IN_PROGRESS,
            progress: 20
        });
        expect(component.find('.progress-bar').prop('className')).to.have.string('active');
        expect(component.find('.progress-bar').prop('style')).to.deep.equal({ width: '20%' });

    });

    it('should show failed upload state', () => {
        const { component } = setup({
            status: UPLOAD_FAILED,
            progress: 100
        });

        expect(component.find('.progress-bar').prop('className')).to.have.string('progress-bar-danger');
        expect(component.find('.progress-bar').prop('style')).to.deep.equal({ width: '100%' });
    });

    it('should show succesful upload state', () => {
        const { component } = setup({
            status: UPLOAD_SUCCESS,
            progress: 100
        });

        expect(component.find('.progress-bar').prop('className')).to.have.string('progress-bar-success');
        expect(component.find('.progress-bar').prop('style')).to.deep.equal({ width: '100%' });
    });

});

