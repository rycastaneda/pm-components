import React, { PropTypes } from 'react';
import EditForm from '../containers/EditForm';
import ViewForm from '../containers/ViewForm';

const RequirementsList = ({ list, handleUpdate, handleDelete }) => (
    <div>
        {list.map(item =>
            item.isEditing ?
                <EditForm key={item.id}
                          item={item}/> :
                <ViewForm key={item.id}
                          text={item.attributes.text}
                          handleUpdate={() => handleUpdate(item)}
                          handleDelete={() => handleDelete(item)}/>
        )}
    </div>
);

RequirementsList.propTypes = {
    list: PropTypes.array.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
};

export default RequirementsList;