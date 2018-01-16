import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { clearNotifications } from './actions';
import { MESSAGE_TYPE_ERROR } from './constants';
class Notification extends Component {

    constructor(props) {
        super(props);
        this.toasterTimerId = null;
    }


    componentWillUnmount() {
        clearInterval(this.toasterTimerId);
    }
    componentWillReceiveProps(nextProps) {
        clearInterval(this.toasterTimerId);
        if (nextProps.messages.length) {
            this.toasterTimerId = setInterval(() => {
                this.props.dispatch(clearNotifications());
                clearInterval(this.toasterTimerId);
            }, 3500);
        }
    }

    render() {
        let { messages } = this.props;
        let errorClass ='';
        let messagesCount = messages.length;
        if ((this.props.messages.length)&&(this.props.messages.find(item => item.messageType === MESSAGE_TYPE_ERROR))) {
            errorClass = 'error';
        }
        if (messagesCount) {
            return <div className={`toast-container ${errorClass} active auto-hide`}>
                {
                    messages.map((item, index) =>
                        <span key={index}> {item.message}</span>
                    )
                }
            </div>;
        } else {
            return null;
        }

    }
}

Notification.propTypes = {
    messages: PropTypes.array,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { messages } = state.notification;

    return {  messages };
}
export default connect(mapStateToProps)(Notification);
