import React from 'react';
import { Translate } from "react-redux-i18n";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const NotFound = () => {
  
  return (
    <Row className="justify-content-md-center">
      <Col lg="4" className="mt-4 pb-3 pt-1 text-center border border-dark rounded">
        <h1><Translate value='notFound.notFound' /></h1>
        <p>404</p>
      </Col>
    </Row>
  );
}

export default NotFound;
