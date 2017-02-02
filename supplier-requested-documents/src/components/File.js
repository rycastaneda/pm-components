import React, { PropTypes, Component } from 'react';


class File extends Component { 
    render() {
        const {
            file,
            requirementId,
            onFileRemove
        } = this.props;

        return (
            <li className="list-group-item">
                <span>
                    <i className="fa fa-times" onClick={() => onFileRemove(requirementId, file.id)}></i>
                </span>
                <span>{file.name}</span>
            </li>
        );
    }
}

File.propTypes = {
    file: PropTypes.object.isRequired,
    requirementId: PropTypes.string.isRequired,
    onFileRemove: PropTypes.func.isRequired
};

export default File;

