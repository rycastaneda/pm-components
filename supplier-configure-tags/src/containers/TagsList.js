import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Tag from '../components/Tag';
import { TAG_SKELETON } from '../constants/model';
import { fetchAllTags, saveTag } from '../actions/configureTagsActions';
/**
 * @description: Manages supplier Tags as a table
 */
class TagsList extends Component {
    constructor(props) {
        super(props);
        this.state = { showAdd:false };
        this.newTag = Object.assign({}, TAG_SKELETON);
        this.populateTagsRow = this.populateTagsRow.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onTagEditCancel = this.onTagEditCancel.bind(this);
    }
    onSave(item) {
        this.props.dispatch(saveTag(item));
        this.state = { showAdd:false };
    }
    onTagEditCancel(id) {
        if (id===null) {
            this.setState({ showAdd:false });
        }
    }
    componentDidMount() {
        this.props.dispatch(fetchAllTags());
    }
    render() {
        const { errorMessage, availableTags } = this.props;
        return (
            <div className="tag-list">
                <button className="btn btn-sm pull-right mar-btm-md"
                    onClick = { () => this.setState({ showAdd:true }) }>
                    <i className="fa fa-plus"></i>Add
                </button>
                <div className="clear">{errorMessage?<div className="bs-callout bs-callout-danger">{errorMessage}</div>:null}</div>
                <table  className="table db-table">
                     <thead>
                            <tr className="row" >
                              <th className="col-sm-2 td-center">Icon</th>
                              <th className="col-sm-2 td-center">Title</th>
                              <th className="col-sm-4 td-center">Description</th>
                              <th className="col-sm-1 td-center">Active</th>
                              <th className="col-sm-3 td-center"></th>
                            </tr>
                        </thead>
                    <tbody>
                        {this.state.showAdd?
                            <Tag item={this.newTag} key={'new'} onCancel={this.onTagEditCancel} onSave={this.onSave} />
                            :null
                        }
                        {
                            availableTags.map(this.populateTagsRow, this)
                        }
                    </tbody>
                </table>
                {availableTags.length?null:<div className="col-sm-12 text-center">{'Click \'Add\' to create supplier tags'}</div>}
            </div>);
    }


    populateTagsRow(item) {
        return (
            <Tag item={item} key={item.id} onSave={this.onSave} />
        );
    }
}

TagsList.propTypes = {
    availableTags : PropTypes.array.isRequired,
    dispatch : PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};

function mapStateToProps(state) {
    const { errorMessage, availableTags } = state.configureTags;
    return { errorMessage, availableTags };
}
export default connect(mapStateToProps)(TagsList);
