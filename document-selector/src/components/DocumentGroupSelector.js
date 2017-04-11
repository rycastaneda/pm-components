import React, { PropTypes } from 'react';
import Groups from '../components/Groups';

const DocumentGroupSelector = ({ quote_id, groups, items, toggleGroup, toggleDocument }) => {
    const documentsButton = (
        <div>
            <div className="pull-right">
                <a className="db-function copy-from"
                    href={`/searcher/quotes/documents/${quote_id}`}>
                    Return to step 2 to add documents
                </a>
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
    quote_id: PropTypes.any,
    groups: PropTypes.array.isRequired,
    items: PropTypes.object.isRequired,
    toggleGroup: PropTypes.func.isRequired,
    toggleDocument: PropTypes.func.isRequired
};

export default DocumentGroupSelector;
