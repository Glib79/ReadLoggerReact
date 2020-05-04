import React from 'react';
import { connect } from 'react-redux';
import { Translate } from "react-redux-i18n";
import { PropTypes } from "prop-types";
import { logout } from '../../redux/actions/user';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { setLocaleWithFallback } from "../../redux/actions/i18n";
import LanguageSelector from './LanguageSelector';

const StatusBar = ({locale='en', user={}, onSetLocale=f=>f, onLogout=f=>f}) => {
    
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/"><Translate value='statusBar.brand' /></Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Nav className="mr-3">
          <Navbar.Text>
            {
              (user.token) 
              ? user.data.email  
              : <Button variant="outline-primary" href="/register"><Translate value='statusBar.register' /></Button> 
            }
          </Navbar.Text>
        </Nav>
        <Nav className="mr-3">
          <Navbar.Text>
            {
              (user.token) 
              ? <Button variant="outline-primary" onClick={onLogout} href="/login"><Translate value='statusBar.logOut'/></Button>  
              : <Button variant="outline-primary" href="/login"><Translate value='statusBar.logIn' /></Button> 
            }
          </Navbar.Text>
        </Nav>
        <Nav>
          <LanguageSelector locale={locale} onSetLocale={onSetLocale} />
        </Nav>
      </Navbar.Collapse>      
    </Navbar>
  );
};

StatusBar.propTypes = {
  locale: PropTypes.string.isRequired,
  user: PropTypes.object,
  onSetLocale: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    locale: state.i18n.locale,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetLocale(locale) {
        dispatch(
          setLocaleWithFallback(locale)
        );
    },
    onLogout() {
       dispatch(
         logout()
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar);
