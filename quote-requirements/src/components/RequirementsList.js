import React, { PropTypes } from 'react';
import Editor from '../components/Editor';
import Viewer from '../components/Viewer';

const RequirementsList = ({ list, onUpdate, onDelete, onSave }) => (
    <div>
        {list.map(item =>
            item.isEditing ?
                <Editor key={item.id}
                        text="Test"
                        onSave={() => onSave(item)} /> :

                <Viewer key={item.id}
                        text="Test2"
                        onUpdate={() => onUpdate(item.id)}
                        onDelete={() => onDelete(item.id)} />
        )}
    </div>
);

RequirementsList.propTypes = {
    list: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};

export default RequirementsList;