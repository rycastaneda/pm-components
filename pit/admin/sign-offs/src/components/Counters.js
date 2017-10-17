import React, { PropTypes, Component } from 'react';

class Counters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isHovered: false
        };

        this.onHover = this.onHover.bind(this);
    }
    componentDidMount() {
        console.log("this", this); // eslint-disable-line no-console, quotes
    }
    onHover() {

    }
    render() {
        const { counters } = this.props;

        return (
            <div>
                <span className="mar-r-sm badge badge-success" ref={ref => this.approvedRef = ref}>{counters.approved}</span>
                <span className="mar-r-sm badge badge-bg-danger" ref={ref => this.rejectedRef = ref}>{counters.rejected}</span>
                <span className="mar-r-sm badge badge-warning" ref={ref => this.inProgressRef = ref}>{counters.inprogress}</span>
                <span className="mar-r-sm badge badge-info" ref={ref => this.pendingRef = ref}>{counters.pending}</span>
            </div>
        );
    }
}

Counters.propTypes = {
    counters: PropTypes.shape({ 
        pending: PropTypes.number.isRequired, 
        rejected: PropTypes.number.isRequired,
        approved: PropTypes.number.isRequired,
        inprogress: PropTypes.number.isRequired
    })
};

export default Counters;

