import React, { PropTypes } from 'react';
import Groups from '../components/Groups';

const DocumentGroupSelector = ({ groups, items, toggleGroup, toggleDocument, returnDocument }) => {
    const documentsButton = (
        <div>
            <div className="pull-right">
                <button onClick={returnDocument} type="button" className="db-function copy-from" data-provide="return">
                    Return to step 2 to add documents
                </button>
            </div>
            <div className="clearfix"></div>
        </div>
    );

    return (
        groups.length ?
            <table className="table">
                <Groups groups={groups} items={items} toggleGroup={toggleGroup} toggleDocument={toggleDocument}/>
            </table>
        :   <div className="col-xs-12">
                No documents found
                {documentsButton}
            </div>
    );
};

DocumentGroupSelector.propTypes = {
    groups: PropTypes.array.isRequired,
    items: PropTypes.object.isRequired,
    toggleGroup: PropTypes.func.isRequired,
    toggleDocument: PropTypes.func.isRequired,
    returnDocument: PropTypes.func.isRequired
};

export default DocumentGroupSelector;
