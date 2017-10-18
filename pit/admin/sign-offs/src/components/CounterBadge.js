import React, { PropTypes, Component } from 'react';

class CounterBadge extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isHovered: false
        };

        this.onHoverIn = this.onHoverIn.bind(this);
        this.onHoverOut = this.onHoverOut.bind(this);
    }
    onHoverIn() {
        this.setState({
            isHovered: true
        });
    }
    onHoverOut() {
        this.setState({
            isHovered: false
        });
    }
    render() {
        const { count, status } = this.props;

        const badges = {
            'rejected': {
                class: 'badge-bg-danger',
                text: 'Rejected'
            },
            'approved': {
                class: 'badge-success',
                marginLeft: -65,
                text: 'Approved'
            },
            'pending': {
                class: 'badge-info',
                marginLeft: -60,
                text: 'Pending'
            },
            'in progress': {
                class: 'badge-warning',
                marginLeft: -77,
                text: 'In Progress'
            }
        };

        const marginLeft = this.state.isHovered ? -15 : badges[status].marginLeft || -60;

        return (
            <span className={`mar-r-sm counter-badge ${this.state.isHovered ? 'in' : ''}`}>
                <span className={`counter-badge__text badge ${badges[status].class} ${this.state.isHovered ? 'in' : ''}`}>{badges[status].text}</span>
                <span className={`badge ${badges[status].class}--lighter counter-badge__count`} onMouseEnter={this.onHoverIn} onMouseLeave={this.onHoverOut}>{count}</span>
            </span>
        );
    }
}

CounterBadge.propTypes = {
    status: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
};

export default CounterBadge;

