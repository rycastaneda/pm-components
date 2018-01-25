import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Filters from './Filters';
import SearchForm from '../components/SearchForm';
import StatusDropdown from '../components/StatusDropdown';
import StaffDropdown from '../components/StaffDropdown';

const quickSearch = sinon.spy();
const changeFilters = sinon.spy();
const clearFilters = sinon.spy();
const downloadAssignments = sinon.spy();

const setup = props => {
    const component = shallow(<Filters {...props} />);

    return { component };
};

describe('Filters component: ', () => {
    const props = {
        keyword: 'test',
        selectedStaff: 0,
        canViewAll: true,
        status: [0, 1],
        staff: {
            data: [],
            isLoading: false
        },
        quickSearch,
        changeFilters,
        clearFilters,
        downloadAssignments
    };

    it('should be able to render the SearchForm with props', () => {
        const { component } = setup(props);
        const searchProps = component.find(SearchForm).props();
        expect(searchProps.keyword).to.eql(props.keyword);
    });

    it('should not render the other filters initially', function() {
        const { component } = setup(props);
        expect(component.find('form')).to.have.length(0);
    });

    it('should be able render the filters after setting the state', function() {
        const { component } = setup(props);
        component.setState({
            showFilters: true
        });
        expect(component.find('form')).to.have.length(1);
        const status = component.find(StatusDropdown);
        const statusProps = status.props();
        expect(statusProps.selectedStatus).to.eql(props.status);

        const staff = component.find(StaffDropdown);
        const staffProps = staff.props();
        expect(staffProps.staff).to.eql(props.staff.data);
        expect(staffProps.isLoading).to.eql(props.staff.isLoading);
        expect(staffProps.selectedStaff).to.eql(props.selectedStaff);
    });

    it('should be able to apply the filters', function() {
        const { component } = setup(props);
        component.setState({
            showFilters: true
        });

        const form = component.find('form');
        form.simulate('submit', { preventDefault: sinon.spy() });
        expect(changeFilters.called).to.be.true;
    });

    it('should be able to clear the filters', function() {
        const { component } = setup(props);
        component.setState({
            showFilters: true
        });

        const clear = component.find('a.btn');
        clear.simulate('click');
        expect(clearFilters.called).to.be.true;
    });
});
