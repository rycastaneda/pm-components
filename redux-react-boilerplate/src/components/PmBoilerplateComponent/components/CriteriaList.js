import React from 'react';
import PropTypes from 'prop-types';
import Criteria from './Criteria';
import { connect } from 'react-redux';
import { selectFromStore } from '../../../utils/reduxApiUtils';
import { CriteriaListStyled } from '../styling/styledComponents';

const CriteriaList = ({ criteria }) => (
    <CriteriaListStyled className="list-group">
        {criteria.map((criteria) => {
            return <Criteria key={criteria.id} criteria={criteria} />;
        })}
    </CriteriaListStyled>
);

CriteriaList.propTypes = {
    criteria: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    const templateInstance = selectFromStore(
        state.pmBoilerplate,
        `/evaluation-templates/${ownProps.id}`,
        'evaluationTemplates'
    );

    const criteria = templateInstance.length > 0 ? templateInstance[0].criteria : [];

    return {
        ...ownProps,
        criteria,
    };
};

export default connect(mapStateToProps)(CriteriaList);
