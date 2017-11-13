import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import CounterBadge from './CounterBadge';

const setup = props => {
    const component = mount(<CounterBadge {...props} />);

    return { component };
};

describe('CounterBadge component: ', () => {
    const badges = {
        rejected: {
            class: 'badge-bg-danger',
            text: 'Declined'
        },
        approved: {
            class: 'badge-success',
            text: 'Approved'
        },
        pending: {
            class: 'badge-info',
            text: 'Pending'
        },
        'in progress': {
            class: 'badge-warning',
            text: 'In Progress'
        }
    };

    it('should be able to render the counter and show text on hover', () => {
        const { component } = setup({
            status: 'approved',
            count: 2
        });
        const count = component.find('.counter-badge__count');
        const text = component.find('.counter-badge__text');

        expect(count.text()).to.eql('2');
        expect(text.text()).to.eql('Approved');
        count.simulate('mouseenter');
        expect(text.hasClass('in')).to.be.true;
    });

    Object.keys(badges).map(status => {
        it(`should render class ${badges[
            status
        ]} and text when status is ${status}`, function() {
            const { component } = setup({
                status,
                count: 2
            });

            const element = component.find(`.${badges[status].class}`);

            expect(element).to.be.not.undefined;
            expect(element.text()).to.eql(badges[status].text);
        });
    });
});
