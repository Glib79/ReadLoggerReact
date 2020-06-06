import React from 'react';
import { Translate } from "react-redux-i18n";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Welcome = () => {

  return (
    <Row>
      <Col className="mt-4">
        <h1><Translate value='welcome.welcome' /></h1>
      </Col>
    </Row>
  );
};

export default Welcome;
