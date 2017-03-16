import React, { Component, PropTypes } from 'react';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody
} from 'react-modal-bootstrap';

export default class CopyFromModal extends Component {
    render() {
        const {
            active,
            items, 
            isOpen,
            closeModal,
            selectItem
        } = this.props;

        const list = items.allIds.map((id, key) => {
            return (
                <li 
                    key={key} 
                    onClick={() => selectItem(id)}
                    className={`list-group-item ${id === active ? 'active' : ''}`}>
                    {items.byId[id].title}
                </li>
            );
        });

        return (
            <Modal isOpen={isOpen} onRequestHide={closeModal}>
                <ModalHeader>
                    <ModalClose onClick={closeModal}/>
                    <ModalTitle>Copy From</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <ul className="requestedItems">
                        {list}
                    </ul>            
                </ModalBody>
            </Modal>
        );
    }
}

CopyFromModal.propTypes = {
    active: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    items: PropTypes.object,
    isOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    selectItem: PropTypes.func
};

