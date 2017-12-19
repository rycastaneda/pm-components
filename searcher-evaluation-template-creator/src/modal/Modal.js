import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { closeModal } from './actions';
class Modal extends Component {

    constructor(props) {
        super(props);
        this.onCloseModal = this.onCloseModal.bind(this);
    }

    onCloseModal() {
        this.props.dispatch(closeModal());
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    render() {
        let { message, title, isOpen } = this.props;
        let modalStyle, containerClassName;
        if (isOpen) {
            containerClassName +=' fade in ';
            modalStyle =  { display: 'block' };
        } else {
            containerClassName +=' fade out ';
            modalStyle = { display: 'none' };
        }
        return (
            <div>
                <div className={`modal-backdrop ${containerClassName}`} style={ modalStyle }></div>
                <div className={`modal ${containerClassName}`} style={ modalStyle }>
                    <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" onClick ={this.onCloseModal} >×</button>
                            <h4 className="modal-title">{title}</h4>
                          </div>
                          <div className="modal-body">
                            <p>{message}</p>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    message: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func,
    isOpen: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { modal } = state;
    const { message, title, isOpen, onClose } = modal;

    return { message, title, isOpen, onClose };
}
export default connect(mapStateToProps)(Modal);
