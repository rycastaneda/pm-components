import React from 'react';
import { shallow } from 'enzyme';
import UserBadge from './UserBadge';
import { expect } from 'chai';

describe('UserBadge component: ', () => {
    it("should render a the user's name and the approved icon", () => {
        const component = shallow(
            <UserBadge name="Tester" status="approved" />
        );

        expect(component.text()).to.eql('Tester');
        expect(component.hasClass('badge-success')).to.be.true;
        expect(component.find('i.fa-check-circle')).to.have.length(1);
    });

    it("should render a the user's name and the not approved icon", () => {
        const component = shallow(
            <UserBadge name="Tester" status="declined" />
        );

        expect(component.text()).to.eql('Tester');
        expect(component.hasClass('badge-bg-danger')).to.be.true;
        expect(component.find('i.fa-times-circle')).to.have.length(1);
    });

    it("should render a the user's name and the pending icon", () => {
        const component = shallow(<UserBadge name="Tester" status="pending" />);

        expect(component.text()).to.eql('Tester');
        expect(component.hasClass('badge-info')).to.be.true;
        expect(component.find('i.fa-exclamation-circle')).to.have.length(1);
    });

    it("should render a the user's name and the in progress icon", () => {
        const component = shallow(
            <UserBadge name="Tester" status="in progress" />
        );

        expect(component.text()).to.eql('Tester');
        expect(component.hasClass('badge-warning')).to.be.true;
        expect(component.find('i.fa-gears')).to.have.length(1);
    });
});
