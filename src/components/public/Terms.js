import React from 'react';
import { Translate } from "react-redux-i18n";
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Terms = ({show=false, setShow=f=>f}) => {
    
    const handleClose = () => {
        setShow(false);
    };
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title><Translate value="terms.title" /></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div><Translate value="terms.par1" /></div>
                <div><Translate value="terms.par2" /></div>
                <div><Translate value="terms.par3" /></div>
                <div><Translate value="terms.par4" /></div>
                <div><Translate value="terms.par5" /></div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    <Translate value="terms.close" />
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

Terms.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired
};

export default Terms;