import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import StatusBadge from './StatusBadge';

const setup = props => {
    const component = mount(<StatusBadge {...props} />);

    return { component };
};

describe('StatusBadge component: ', () => {
    const icon = {
        0: {
            icon: 'fa-exclamation-circle bs-callout-warning',
            class: 'badge-info',
            text: 'Pending'
        },
        1: {
            icon: 'fa-gears bs-callout-warning',
            class: 'badge-warning',
            text: 'In Progress'
        },
        2: {
            icon: 'fa-check bs-callout-success',
            class: 'badge-success',
            text: 'Approved'
        },
        3: {
            icon: 'fa-times bs-callout-danger',
            class: 'badge-bg-danger',
            text: 'Declined'
        }
    };

    const statusId = 1;

    it('should be able to render the icon and show text on hover', () => {
        const { component } = setup({
            statusId
        });
        const hoverIcon = component.find('.status-badge__icon');
        const badge = component.find('i.fa-gears');
        const text = component.find('.status-badge__text');
        expect(badge).to.have.length(1);
        expect(text.text()).to.eql(icon[statusId].text);
        hoverIcon.simulate('mouseenter');
        expect(text.hasClass('in')).to.be.true;
    });

    Object.keys(icon).map(statusId => {
        it(`should render class ${icon[
            statusId
        ]} and text when status is ${statusId}`, function() {
            const { component } = setup({
                statusId,
                count: 2
            });

            const element = component.find(`.${icon[statusId].class}`);

            expect(element).to.be.not.undefined;
            expect(element.text()).to.eql(icon[statusId].text);
        });
    });
});
