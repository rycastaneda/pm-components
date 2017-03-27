import React, { PropTypes, Component } from 'react';
import Requirement from './Requirement';

class Requirements extends Component { 
    render() {
        const requirements = this.props.requirements.map((requirement, key) => {
            return <Requirement 
                readOnly={this.props.readOnly}
                key={key}
                requirement={requirement} 
                onRemoveDocument={this.props.onRemoveDocument}
                onDropDocuments={this.props.onDropDocuments}>
            </Requirement>;
        });

        return (
            <ul className="list-group">
                {requirements}
            </ul>
        );
    }
}

Requirements.propTypes = {
    requirements: PropTypes.array.isRequired,
    readOnly: PropTypes.bool,
    onRemoveDocument: PropTypes.func.isRequired,
    onDropDocuments: PropTypes.func.isRequired
};

export default Requirements;

