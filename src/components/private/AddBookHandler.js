import React, { useState, Suspense } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Translate } from 'react-redux-i18n';
import { fetchData } from '../../api/endpoints';
import AddBookForm from '../book/AddBookForm';
import ErrorBoundary from '../support/ErrorBoundary';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

const AddBookHandler = ({ user={} }) => {
  const [resource] = useState(() => fetchData('/api/support/format-language-status', 'GET', {}, { token: user.token }));

  return (
    <ErrorBoundary>
      <Row className="mt-4">
        <Col>
          <h1><Translate value='addBookHandler.title' /></h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Suspense fallback={<Spinner animation="border" variant="primary" />}>
            <AddBookForm resource={resource} />
          </Suspense>
        </Col>
      </Row>
    </ErrorBoundary>
  );
};

AddBookHandler.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(AddBookHandler);
