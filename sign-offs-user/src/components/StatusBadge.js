import React, { PropTypes, Component } from 'react';

class StatusBadge extends Component {
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
        const { statusId } = this.props;

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


        return  (
            <span
                className={`pull-right mar-r-sm status-badge ${this.state.isHovered
                    ? 'in'
                    : ''}`}>
                <span
                    className={`status-badge__text badge ${icon[statusId]
                        .class} ${this.state.isHovered ? 'in' : ''}`} >
                    {icon[statusId].text}
                </span>
                <span
                    className={`badge status-badge__icon`}
                    onMouseEnter={this.onHoverIn}
                    onMouseLeave={this.onHoverOut}>
                    <i className={`fa ${icon[statusId].icon}`}></i>
                </span>
            </span>
        );
    }
}

StatusBadge.propTypes = {
    statusId: PropTypes.number.isRequired
};

export default StatusBadge;
