import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { format } from 'date-fns';
import Comment from './Comment';

const setup = props => {
    const component = mount(<Comment {...props} />);

    return { component };
};

describe('Comment component: ', () => {
    it('should be able to render the Comment with props', () => {
        const props = {
            staff: 'Reese',
            text: 'Company size is too small, still considering',
            date: `09-17-2017 9:20:00 AM`
        };
        const { component } = setup(props);
        expect(component.find('p').text()).to.contain(props.text);
        expect(component.find('.staff').text()).to.contain(
            `— ${props.staff} ${format(props.date, 'MMMM D, YYYY HH:mm a')}`
        );
    });
});
