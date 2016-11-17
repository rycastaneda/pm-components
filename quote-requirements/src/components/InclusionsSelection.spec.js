import React from 'react';
import { shallow } from 'enzyme';
import InclusionSelection from './InclusionSelection';
import { expect } from 'chai';

const setup = (props) => {
    const component = shallow(
        <InclusionSelection {...props} />
    );

    return { component };
};

const handleChange = () => true;
const options = [
    {
        id: 1,
        selectedCategory: {
            id: '22'
        },
        input: 'test'
    }
];

describe('Inclusions selection component: ', () => {
    it('should render attributes, id and initial state ', () => {

    });
    
});
