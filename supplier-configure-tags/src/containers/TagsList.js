'use strict';
import React, { PropTypes,  Component } from 'react';
import { connect } from 'react-redux';
import ColorPicker from '../components/ColorPicker';
/**
 * @description: Manages supplier Tags as a table
 */
class TagsList extends Component {
    constructor(props) {
        super(props);
        this.populateTagsRow = this.populateTagsRow.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
    }
    render() {
        const { availableTags } = this.props;
        return (<div><table  className="table table-striped"><tbody>{availableTags.map(this.populateTagsRow)}</tbody></table></div>);
    }
    handleColorChange(color) {
        window.console.log(color);
    }
    populateTagsRow(item, index) {
        return <tr key={index}>
            <td><ColorPicker /></td><td><select><option>1</option><option>2</option></select></td><td>{item.title}</td><td>{item.description}</td></tr>;
    }

}

TagsList.propTypes = {
    availableTags : PropTypes.array.isRequired,
    dispatch : PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { availableTags } = state.configureTags;
    return { availableTags };
}
export default connect(mapStateToProps)(TagsList);
