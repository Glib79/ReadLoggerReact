import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Translate, I18n } from "react-redux-i18n";
import { login } from '../../redux/actions/user'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

const LoginForm = ({ fetching=false, loggedin=false, onLogin=f=>f }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onUsernameChange = e => {
    setUsername(e.target.value);
  };

  const onPasswordChange = e => {
    setPassword(e.target.value);
  };
  
  const onSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === true && !fetching) {
      onLogin(username, password);
    }
  };
  
  if (loggedin) {
    return(<Redirect push to="/dashboard" />);
  };
  
  return (
    <Row className="justify-content-md-center">
      <Col lg="4" className="mt-4 pb-3 pt-1 text-center border border-dark rounded">
        <h1><Translate value='loginForm.title' /></h1>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formLoginUsername">
            <Form.Control 
              required 
              type="email" 
              value={username}
              onChange={onUsernameChange}
              placeholder={I18n.t('loginForm.enterEmail')} 
            />
          </Form.Group>
          <Form.Group controlId="formLoginPassword">
            <Form.Control 
              required 
              type="password" 
              value={password}
              onChange={onPasswordChange}
              placeholder={I18n.t('loginForm.password')} 
            />
          </Form.Group>
          <Button variant="primary" disabled={fetching ? true : false} type={fetching ? "" : "submit"}>
            {(fetching)
              ? <Spinner 
                  as="span" 
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              : <Translate value='loginForm.loginSubmit' />
            }
          </Button>
        </Form>
      </Col>
    </Row>
  );
}


LoginForm.propTypes = {
  fetching: PropTypes.bool.isRequired,
  loggedin: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    fetching: state.fetchers.login,
    loggedin: state.user.token ? true : false
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin(username, password) {
      dispatch(
        login(username, password)
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
