import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { addMessage } from '../../redux/actions/messages';
import { prepareOptions, handleErrors } from '../../config/api';
import { Translate } from 'react-redux-i18n';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

const NotConfirmed = ({ user={}, addMessage=f=>f, handleErrors=f=>f }) => {
    const [fetching, setFetching] = useState(false);

    const onResendEmail = () => {
        const options = prepareOptions('/api/user/resend-confirmation-email', 'GET', {}, { token: user.token });
    
        axios(options)
            .then(response => {
                addMessage('notConfirmed.resendMessage', 'success');
            })
            .catch(error => {
                handleErrors(error);
            });
            
        setFetching(false);
    };
    
    if (user.data.isConfirmed) {
        return (<Redirect push to="/dashboard" />);
    }

    return (
        <Row>
            <Col className="mt-4">
                <h1><Translate value='notConfirmed.title' /></h1>
                <Translate value='notConfirmed.text' />
                <br /><br />
                <Translate value='notConfirmed.resendText' />
                <br />
                <Button variant="primary" disabled={fetching ? true : false} onClick={onResendEmail}>
                    {(fetching)
                      ? <Spinner 
                          as="span" 
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      : <Translate value='notConfirmed.resendButton' />
                    }
                </Button>
            </Col>
        </Row>
    );
};

NotConfirmed.propTypes = {
  user: PropTypes.object.isRequired,
  addMessage: PropTypes.func.isRequired,
  handleErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return { 
    addMessage(message, type) {
      dispatch(
        addMessage(message, type)
      );
    },
    handleErrors(error) {
      dispatch(
        handleErrors(error)
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotConfirmed);
