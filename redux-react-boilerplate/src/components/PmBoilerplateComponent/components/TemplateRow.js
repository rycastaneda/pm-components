import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as apiActions from '../../../actions/apiActions';
import CriteriaList from './CriteriaList';
import { getLoadingForEndpoint } from '../../../utils/reduxApiUtils';
import { TemplateTitle } from '../styling/styledComponents';

const TemplateRow = ({ template, apiActions, loading }) => (
    <div className="well well-lg list-group-item">
        <TemplateTitle>{template.title}</TemplateTitle>
        <span
            role="button"
            onClick={() => {
                apiActions.fetchCriteria(template.id);
            }}
            className="badge"
        >
            { loading ? ' Loading.. ' : ' Show Criteria ' }
        </span>
        <CriteriaList id={template.id} />
    </div>
);

TemplateRow.propTypes = {
    template: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    apiActions: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
    return {
        apiActions: bindActionCreators(apiActions, dispatch),
    };
};

const mapStateToProps = (state, ownProps) => {
    const loading = getLoadingForEndpoint(
        state.pmBoilerplate,
        `/evaluation-templates/${
            ownProps.template.id
        }?include=criteria.questions`
    );

    return {
        ...ownProps,
        loading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TemplateRow);
