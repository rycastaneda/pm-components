import React, { PropTypes,  Component } from 'react';
import { connect } from 'react-redux';
import { updateUsersAllowed } from '../actions/configureTagsActions';
import TagsList from './TagsList';
class ConfigureTags extends Component {

    constructor(props) {
        super(props);
        this.onUserAllowedCheckboxChange = this.onUserAllowedCheckboxChange.bind(this);
    }

    componentDidMount() {
    //    let selector = document.querySelector('[data-component="supplier-configure-tags"]');
    }
    onUserAllowedCheckboxChange() {
        this.props.dispatch(updateUsersAllowed(!this.props.isUsersAllowed));
    }
    render() {
        const { isUsersAllowed } = this.props;
        return (
             <div className="row">
                <div className="col-xs-12">
                    <label><input type="checkbox" checked={isUsersAllowed} value={isUsersAllowed} onChange={this.onUserAllowedCheckboxChange}/>Allow standard users to apply tags to suppliers</label>
                </div>
                    <div className="col-xs-12">
                        <h5>Tags Available </h5>
                        <TagsList></TagsList>
                    </div>
            </div>
        );
    }

}

ConfigureTags.propTypes = {
    isUsersAllowed : PropTypes.bool.isRequired,
    dispatch : PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { isUsersAllowed } = state.configureTags;
    return { isUsersAllowed };
}
export default connect(mapStateToProps)(ConfigureTags);
