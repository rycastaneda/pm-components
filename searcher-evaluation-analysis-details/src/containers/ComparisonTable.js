import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import ComparisonRow from '../components/ComparisonRow';

export class ComparisonTable extends Component {
    render() {
        const { criteria, entities } = this.props;

        return (
            <table className="table db-table db-table-sort">
                <thead>
                    <tr>
                        <th>User</th>
                        {criteria.map(criterion => (
                            <th key={criterion.id}>{criterion.title}</th>
                        ))}
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {entities.map(entity => {
                        return (
                            <ComparisonRow
                                key={entity.id}
                                criteria={criteria}
                                entity={{ ...entity }}
                            />
                        );
                    })}
                </tbody>
            </table>
        );
    }
}

ComparisonTable.propTypes = {
    criteria: PropTypes.array,
    entities: PropTypes.array
};

function mapStateToProps(state) {
    const {
        assignments: rawAssignments,
        comments: rawComments,
        questions: rawQuestions,
        criterion: rawCriteria,
        entity: rawEntity
    } = state;

    const entities = [];

    rawAssignments.allIds.map(assignmentId => {
        let assignment = rawAssignments.byId[assignmentId];
        let scores = {},
            counters = {};
        rawCriteria.allIds.map(criteriaId => {
            scores[criteriaId] = 0;
            counters[criteriaId] = {
                score: 0,
                scale: 0
            };
        });

        assignment.responseIds.map(responseId => {
            let response = rawComments.byId[responseId];

            response.scale = rawQuestions.byId[response.questionId].scale;
            counters[response.criteriaId].score += response.score;
            counters[response.criteriaId].scale += response.scale;

            return response;
        });

        Object.keys(scores).map(criteriaId => {
            scores[criteriaId] =
                counters[criteriaId].score /
                counters[criteriaId].scale *
                rawCriteria.byId[criteriaId].weight;
        });

        entities.push({
            id: assignment.entityId,
            name: rawEntity.byId[assignment.entityId].title,
            scores
        });
    });

    return {
        entities
    };
}

export default connect(mapStateToProps)(ComparisonTable); // adds dispatch prop
