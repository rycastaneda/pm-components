import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Requirement from '../containers/Requirement';
import { getItems } from '../actions/supplierQuoteRequirements';

class SupplierQuoteRequirements extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const self = this;
        this.quoteId = document.querySelector('[data-component="supplier-quote-requirements"]').getAttribute('data-quote-id');
        this.requestItemId = document.querySelector('[data-component="supplier-quote-requirements"]').getAttribute('data-rqid');
        this.matchedItemId = document.querySelector('[data-component="supplier-quote-requirements"]').getAttribute('data-riqi-id');
        self.props.dispatch(getItems(this.quoteId, this.matchedItemId, this.requestItemId));
    }

    hasResponse(requirement) {
        return requirement.response && requirement.response.response;
    }

    render() {
        const { summary, requirements, mandatoryFilled } = this.props;
        return (
            <div className="supplier-quote-requirements__form col-xs-12">

                <input type="hidden" id="requirementsHasResponse" value={requirements.some(this.hasResponse)}/>
                <input type="hidden" id="mandatoryFilled" value={mandatoryFilled}/>
                {requirements.length ? 
                    <div>
                        <label htmlFor="">Quote Requirements</label> 
                    </div>
                : null }
                {Object.keys(summary).map((requirementId) => {
                    return <input key={requirementId} type="hidden" name={`quote-requirement[${requirementId}]`} value={JSON.stringify(summary[requirementId])}/>;
                })}
                {
                    requirements.map((requirement) => {
                        return <Requirement key={requirement.id} requirement={requirement}/>;
                    })
                }
            </div>
        );
    }
}

SupplierQuoteRequirements.propTypes = {
    dispatch: PropTypes.func.isRequired,
    requirements: PropTypes.array.isRequired,
    mandatoryFilled: PropTypes.bool.isRequired,
    summary: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const { requirements, responses } = state;
    let summary = {};

    let normalized = requirements.allIds.map((requirementId) => {
        let requirement = requirements.byId[requirementId];
        
        requirement.response = responses.byId[requirementId] || false;
        if (requirement.response) {
            summary[requirementId] = {
                response: requirement.response.response,
                comment: requirement.response.comment
            };
        }

        return requirement;
    });

    let mandatories = normalized.filter(requirement => requirement.mandatory);

    let mandatoryFilled = !!mandatories.length && mandatories.every((requirement) => {
        return requirement.response && requirement.response.response === 'yes';
    });

    normalized = normalized.sort((a, b) => {
        return +a.mandatory + +b.mandatory;
    });

    return {
        requirements: normalized,
        mandatoryFilled,
        summary
    };
}

export default connect(mapStateToProps)(SupplierQuoteRequirements);  // adds dispatch prop
