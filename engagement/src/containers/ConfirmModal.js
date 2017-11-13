import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

class ConfirmModal extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { title, message, onConfirm, onCancel, modal } = this.props;

        return (
            <div className="confirm-modal">
            { modal.isShowing &&
                <div className="bootbox modal fade in" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="bootbox-close-button close" data-dismiss="modal" aria-hidden="true" onClick={onCancel}>×</button>
                                <h4 className="modal-title">{title}</h4>
                            </div>
                            <div className="modal-body">
                                <div className="bootbox-body">{message}</div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn btn-success" onClick={onConfirm}>Yes</button>
                                <button type="button" className="btn btn btn-danger" onClick={onCancel}>No</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            </div>
        );
    }


}

ConfirmModal.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    modal: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    const { modal } = state;
    return { modal };
}

export default connect(mapStateToProps)(ConfirmModal);
