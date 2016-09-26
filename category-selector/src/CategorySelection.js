import React, { PropTypes, Component } from 'react';
import CategoryList from './CategoryList';
import CategoryTypeList from './CategoryTypeList';
import { CATEGORY_TYPES } from '../constants/CategoryTypes';
import { connect } from 'react-redux';
import { selectCategoryType, fetchPostsIfNeeded } from '../actions/categories';

class CategorySelection extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { dispatch, selectedCategoryType } = this.props;
        dispatch(fetchPostsIfNeeded(selectedCategoryType));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedCategoryType !== this.props.selectedCategoryType) {
            const { dispatch, selectedCategoryType } = nextProps;
            dispatch(fetchPostsIfNeeded(selectedCategoryType));
        }
    }

    handleChange(nextCategoryType) {
        this.props.dispatch(selectCategoryType(nextCategoryType));
    }

    render() {
        const { selectedCategoryType, categories, isFetching, lastUpdated } = this.props;
        const TITLE = 'What service do you need? *';
        const test = [{
            id: 5,
            title: 'Test'
        }, {
            id: 6,
            title: 'Test2'
        }, {
            id: 7,
            title: 'Test2'
        }];

        const testF = () => alert('rrr');

        return (
            <div className="db-form-section">
                <h6 className="db-form-title">{TITLE}</h6>
                <CategoryTypeList types={CATEGORY_TYPES} onTypeClick={this.handleChange} />
                <CategoryList categories={categories} onCategoryClick={testF} />
            </div>
        );
    }
}


CategorySelection.propTypes = {
    selectedCategoryType: PropTypes.string,
    categories: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { selectedCategoryType, postsByCategoryType } = state;
    const {
        isFetching,
        lastUpdated,
        items: categories
    } = postsByCategoryType[selectedCategoryType] || {
        isFetching: true,
        items: []
    };

    return {
        selectedCategoryType,
        categories,
        isFetching,
        lastUpdated
    };
}
export default connect(mapStateToProps)(CategorySelection);