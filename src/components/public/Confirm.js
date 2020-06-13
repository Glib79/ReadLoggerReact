import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Translate } from 'react-redux-i18n';
import { Buffer } from 'buffer';
import axios from 'axios';
import { prepareOptions, handleErrors } from '../../config/api';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

const Confirm = ({ handleErrors=f=>f }) => {
    const [fetch, setFetch] = useState(true);
    const [fetching, setFetching] = useState(true);
    const [status, setStatus] = useState();
 
    const { hash } = useParams();
    
    const buffer = new Buffer(hash, 'base64');
    const data = buffer.toString().split(' ');
    
    const options = prepareOptions('/auth/email-confirm', 'POST', {email: data[0], token: data[1]});
    
    if (fetch) {
        setFetch(false);
        
        axios(options)
            .then(response => {
                response.data.data.status 
                ? setStatus('success')
                : setStatus('error');

                setFetching(false);
            })
            .catch(error => {
                handleErrors(error);
                setFetching(false);
            });
    }
      
    return (
        <Row>
            <Col className="mt-4">
                <h1><Translate value='confirm.title' /></h1>
                <Translate value='confirm.emailText' />
                { data[0] }
                <br /><br />
                <Translate value='confirm.status' />
                {(fetching)
                ? <Spinner 
                    as="span" 
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    />
                : <Translate value={`confirm.${status}`} />
                }
            </Col>
        </Row>
    );
};

Confirm.propTypes = {
  handleErrors: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleErrors(error) {
      dispatch(
        handleErrors(error)
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);
