import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Score from './Score';

const setup = props => {
    const component = shallow(<Score {...props} />);

    return { component };
};

describe('Score component: ', () => {
    const props = {
        score: 1,
        scale: 1,
        showDecimals: false
    };

    it('should render the Score YES or NO if scale is 1', () => {
        const { component } = setup(props);

        expect(component.text()).to.eql('Yes');
    });

    it('should render the Score without decimals', () => {
        let score = 5;
        const { component } = setup({
            ...props,
            scale: 10,
            score,
            showDecimals: false
        });

        expect(+component.text()).to.eql(score);
    });

    it('should render the Score with decimals', () => {
        let score = 5;
        const { component } = setup({
            ...props,
            scale: 10,
            score,
            showDecimals: true
        });

        expect(component.text()).to.eql(score.toFixed(1));
    });
});
