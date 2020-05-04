import React from 'react';
import { connect } from 'react-redux';
import { Translate } from "react-redux-i18n";
import { PropTypes } from "prop-types";
import { clearMessage } from '../../redux/actions/messages';
import Alert from 'react-bootstrap/Alert';

const ShowMessages = ({ messages=[], onClearMessage=f=>f }) => {
    
  return (
    <div className="show-messages">
      {(messages.length) ?
        messages.map((message, i) =>
          <Alert key={i} variant={message.type} onClose={() => onClearMessage(i)} dismissible>
            <p><Translate value={message.message} /></p>
          </Alert>
        ) : null
      }
    </div>
  );
};

ShowMessages.propTypes = {
  messages: PropTypes.array.isRequired,
  onClearMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        messages: state.messages
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onClearMessage(index) {
            dispatch(
                clearMessage(index)
            );
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowMessages);
