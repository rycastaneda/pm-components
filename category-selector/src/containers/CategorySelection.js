import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { selectCategoryFilter, fetchCategoriesIfNeeded } from '../actions/categories';
import CategoryTypeList from '../components/CategoryTypeList';
import { CATEGORY_TYPES } from '../constants/CategoryTypes';
import CategorySuggestion from '../components/CategorySuggestion';

class CategorySelection extends Component {

    constructor(props) {
        super(props);
        // We need to do it because ES6 class properties do not automatically bind to the React class instance
        this.handleCategoryFilterClick = this.handleCategoryFilterClick.bind(this);
    }

    handleCategoryFilterClick(categoryFilter) {
        this.props.dispatch(selectCategoryFilter(categoryFilter.attributes.title));
        return this.props.dispatch(fetchCategoriesIfNeeded(categoryFilter));
    }

    render() {
        const { selectedCategoryFilter, suggestionsList } = this.props;

        const TITLE = 'What service do you need? *';

        return (
            <div
                className="db-form-section">
                <h6
                    className="db-form-title">
                    {TITLE}
                </h6>

                <CategoryTypeList
                    types={CATEGORY_TYPES}
                    onTypeClick={this.handleCategoryFilterClick}
                    selected={selectedCategoryFilter}
                />

                {suggestionsList.map((suggestion, index) => {
                    return (
                        <CategorySuggestion key={index} currentIndex={index} />
                    );})
                }

            </div>
        );
    }
}

CategorySelection.propTypes = {
    selectedCategoryFilter: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    suggestionsList: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    const { selectedCategoryFilter, fetchedCategoriesByFilter, suggestionsList } = state;
    const { isFetching } = fetchedCategoriesByFilter[selectedCategoryFilter] || { isFetching: true };

    return {
        selectedCategoryFilter,
        isFetching,
        suggestionsList
    };
}

export default connect(mapStateToProps)(CategorySelection);