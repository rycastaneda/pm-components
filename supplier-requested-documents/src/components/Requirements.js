import React, { PropTypes, Component } from 'react';
import Requirement from './Requirement';

class Requirements extends Component { 
    render() {
        const requirements = this.props.requirements.map((requirement, key) => {
            return <Requirement 
                key={key}
                requirement={requirement} 
                onFileRemove={this.props.onFileRemove}
                onDropFiles={this.props.onDropFiles}>
            </Requirement>;
        });

        return (
            <div>
                {requirements.length 
                ? requirements
                : 'No matched items found'}
            </div>
        );
    }
}

Requirements.propTypes = {
    requirements: PropTypes.array.isRequired,
    onFileRemove: PropTypes.func.isRequired,
    onDropFiles: PropTypes.func.isRequired
};

export default Requirements;

