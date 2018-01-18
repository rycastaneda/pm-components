import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import ComparisonRow from '../components/ComparisonRow';

export class ComparisonTable extends Component {
    render() {
        const { criteria, entities } = this.props;
        return (
            <table className="table db-table">
                <thead>
                    <tr>
                        <th>User</th>
                        {criteria.map(criterion => (
                            <th
                                className="text-left"
                                key={
                                    criterion.id
                                }>{`${criterion.title} (${criterion.weight})`}</th>
                        ))}
                        <th>Total (100)</th>
                    </tr>
                </thead>
                <tbody>
                    {entities.map(entity => {
                        return (
                            <ComparisonRow
                                key={`${entity.title}-${entity.id}`}
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

function getTotals(tally) {
    let totals = {};

    Object.keys(tally).map(criteriaId => {
        totals[criteriaId] =
            tally[criteriaId].score /
            tally[criteriaId].scale *
            tally[criteriaId].weight;
    });

    return totals;
}

function mapStateToProps(state) {
    const {
        assignments: rawAssignments,
        comments: rawComments,
        questions: rawQuestions,
        criterion: rawCriteria,
        entity: rawEntity
    } = state;

    const entities = [];
    const entityTally = {};

    rawAssignments.allIds.map(assignmentId => {
        let assignment = rawAssignments.byId[assignmentId];
        let uid = `${assignment.entityType}-${assignment.entityId}`;
        if (!entityTally[uid]) {
            entityTally[uid] = {
                id: assignment.entityId,
                type: assignment.entityType,
                tally: {}
            };
            rawCriteria.allIds.map(criteriaId => {
                let criteria = rawCriteria.byId[criteriaId];
                let questions = criteria.questionIds.map(questionId => {
                    return rawQuestions.byId[questionId];
                });

                let isTextOnly = questions.every(
                    question => question.scale === 0
                );
                // if questions are text only, give them full weight else calculate
                entityTally[uid].tally[criteriaId] = {
                    score: +isTextOnly,
                    scale: +isTextOnly,
                    weight: criteria.weight
                };
            });
        }
    });

    rawCriteria.allIds.map(criteriaId => {
        let criteria = rawCriteria.byId[criteriaId];

        criteria.questionIds
            .map(questionId => rawQuestions.byId[questionId])
            .filter(question => question.scale !== 0)
            .map(question => {
                question.commentIds.map(commentId => {
                    let comment = rawComments.byId[commentId];
                    let assignment = rawAssignments.byId[comment.assignmentId];
                    let uid = `${assignment.entityType}-${assignment.entityId}`;
                    entityTally[uid].tally[criteriaId].score += comment.score;
                    entityTally[uid].tally[criteriaId].scale += question.scale;
                });
            });
    });

    Object.keys(entityTally).map(entityKey => {
        let entity = entityTally[entityKey];
        entities.push({
            id: entity.id,
            title: rawEntity.byType[entity.type][entity.id].title,
            score: getTotals(entityTally[entityKey].tally)
        });
    });

    return {
        entities
    };
}

export default connect(mapStateToProps)(ComparisonTable); // adds dispatch prop
