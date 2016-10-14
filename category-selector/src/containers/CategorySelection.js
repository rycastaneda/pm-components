import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { selectType, fetchCategoriesIfNeeded } from '../actions/categories';
import CategoryTypeList from '../components/CategoryTypeList';
import { CATEGORY_TYPES } from '../constants/CategoryTypes';
import CategorySuggestion from './CategorySuggestion';

class CategorySelection extends Component {

    constructor(props) {
        super(props);
        // We need to do it because ES6 class properties do not automatically bind to the React class instance
        this.handleCategoryTypeClick = this.handleCategoryTypeClick.bind(this);
    }

    handleCategoryTypeClick(type) {
        this.props.dispatch(selectType(type.attributes.title));
        return this.props.dispatch(fetchCategoriesIfNeeded(type));
    }

    render() {
        const { categorySelector, isFetching } = this.props;

        return (
            <div>
                <CategoryTypeList
                    types={CATEGORY_TYPES}
                    onTypeClick={this.handleCategoryTypeClick}
                    selected={categorySelector.selectedType}
                    isFetching={isFetching}
                />

                {categorySelector.dropDowns.map((suggestion, index) => {
                    return (
                        <CategorySuggestion key={index} currentIndex={index} />
                    );})
                }
                { categorySelector.isApiError ?
                    <div
                        className="col-xs-12">
                        Sorry, an error occurred while trying to fetch categories. Please refresh the page and try again.
                    </div> : '' }
            </div>
        );
    }
}

CategorySelection.propTypes = {
    categorySelector: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { categorySelector, fetchedCategoryTypes } = state;
    const { isFetching } = fetchedCategoryTypes[categorySelector.selectedType] || { isFetching: false };

    return {
        isFetching,
        categorySelector
    };
}

export default connect(mapStateToProps)(CategorySelection);