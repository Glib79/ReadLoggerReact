import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Translate, I18n } from 'react-redux-i18n';
import axios from 'axios';
import { addMessage } from '../../redux/actions/messages';
import { prepareOptions, handleErrors } from '../../config/api';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

const RegisterForm = ({ loggedin=false, addMessage=f=>f, handleErrors=f=>f }) => {
  const [fetching, setFetching] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [errors, setErrors] = useState({
    password: true, 
    passSL: 'text-muted', //small letter 
    passCL: 'text-muted', //capital letter 
    passD: 'text-muted',  //digit
    passL: 'text-muted',  //length
    rPassword: false
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rPassword, setRPassword] = useState('');

  const onUsernameChange = e => {
    setUsername(e.target.value);
  };

  const onPasswordChange = e => {
    setPassword(e.target.value);

    let passSL, passCL, passD, passL;
    
    passSL = testRegex(e.target.value, /^(?=.*[a-z]).+$/);
    passCL = testRegex(e.target.value, /^(?=.*[A-Z]).+$/);
    passD = testRegex(e.target.value, /^(?=.*\d).+$/);
    passL = testRegex(e.target.value, /^.{7,20}$/);
    
    setErrors({
      password: (passSL && passCL && passD && passL) ? false : true,
      passSL: passSL ? 'text-success' : 'text-muted',
      passCL: passCL ? 'text-success' : 'text-muted',
      passD: passD ? 'text-success' : 'text-muted',
      passL: passL ? 'text-success' : 'text-muted',
      rPassword: comparePasswords(e.target.value, rPassword) 
    });
  };

  const onRPasswordChange = e => {
    setRPassword(e.target.value);
    
    let err = {
      ...errors,
      rPassword: comparePasswords(password, e.target.value)
    };
    setErrors(err);
  };
  
  const onSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === true && !errors.password && !errors.rPassword && !fetching) {
      setFetching(true);
      
      const options = prepareOptions('/auth/register', 'POST', {email: username, password: password});
      
      axios(options)
        .then(response => {
          addMessage('registerForm.successMessage', 'success');
        
          setRegistered(true);
        })
        .catch(error => {
          handleErrors(error);
        });
      
      setFetching(false);
    }
  };
  
  const comparePasswords = (pass, rPass) => {
    return (pass === rPass) ? false : true;
  };
  
  const testRegex = (value, expr) => {
    return (value.match(expr)) ? true : false;
  };
  
  if (loggedin || registered) {
    return(<Redirect push to="/dashboard" />);
  };
  
  return (
    <Row className="justify-content-md-center">
      <Col lg="4" className="mt-4 pb-3 pt-1 text-center border border-dark rounded">
        <h1><Translate value='registerForm.title' /></h1>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formRegisterUsername">
            <Form.Control 
              required 
              type="email" 
              value={username}
              onChange={onUsernameChange}
              placeholder={I18n.t('registerForm.enterEmail')} 
            />
          </Form.Group>
          <Form.Group controlId="formRegisterPassword">
            <Form.Control 
              required 
              type="password" 
              value={password}
              onChange={onPasswordChange}
              placeholder={I18n.t('registerForm.password')} 
            />
            <Form.Text className={`pl-2 text-left ${errors.passSL}`}>
              <Translate value='registerForm.passwordSmallLetter' />  
            </Form.Text>
            <Form.Text className={`pl-2 text-left ${errors.passCL}`}>
              <Translate value='registerForm.passwordCapitalLetter' />  
            </Form.Text>
            <Form.Text className={`pl-2 text-left ${errors.passD}`}>
              <Translate value='registerForm.passwordDigit' />  
            </Form.Text>
            <Form.Text className={`pl-2 text-left ${errors.passL}`}>
              <Translate value='registerForm.passwordLength' />  
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formRegisterRepeatPassword">
            <Form.Control 
              required 
              type="password" 
              value={rPassword}
              onChange={onRPasswordChange}
              placeholder={I18n.t('registerForm.repeatPassword')} 
            />
            {
              errors.rPassword && <Form.Text className="pl-2 text-left text-danger">
                <Translate value='registerForm.passwordsDifferent' />  
              </Form.Text>
            }
          </Form.Group>
          <Button variant="primary" disabled={fetching} type={fetching ? "" : "submit"}>
            {(fetching)
              ? <Spinner 
                  as="span" 
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              : <Translate value='registerForm.registerSubmit' />
            }
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

RegisterForm.propTypes = {
  loggedin: PropTypes.bool.isRequired,
  addMessage: PropTypes.func.isRequired,
  handleErrors: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    loggedin: state.user.token ? true : false
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
