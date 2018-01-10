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

        return !count ? (
            <span />
        ) : (
            <span
                className={`mar-r-sm counter-badge ${this.state.isHovered
                    ? 'in'
                    : ''}`}>
                <span
                    className={`counter-badge__text badge ${badges[status]
                        .class} ${this.state.isHovered ? 'in' : ''}`}>
                    {badges[status].text}
                </span>
                <span
                    className={`badge ${badges[status]
                        .class}--lighter counter-badge__count`}
                    onMouseEnter={this.onHoverIn}
                    onMouseLeave={this.onHoverOut}>
                    {count}
                </span>
            </span>
        );
    }
}

CounterBadge.propTypes = {
    status: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
};

export default CounterBadge;
