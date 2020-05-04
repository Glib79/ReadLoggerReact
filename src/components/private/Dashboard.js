import React, { useState, Suspense } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Translate } from 'react-redux-i18n';
import { fetchData } from '../../api/endpoints';
import BooksList from '../book/BooksList';
import ErrorBoundary from '../support/ErrorBoundary';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

const Dashboard = ({ user={} }) => {
  const [resource] = useState(() => fetchData('/api/user-books', 'GET', {}, { token: user.token }));

  return (
    <ErrorBoundary>
      <Row className="mt-4">
        <Col>
          <h1><Translate value='dashboard.welcome' /></h1>
        </Col>
        <Col className="text-right">
            <Button variant="primary" href="/add-book"><Translate value='dashboard.addBook' /></Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Suspense fallback={<Spinner animation="border" variant="primary" />}>
            <BooksList resource={resource} />
          </Suspense>
        </Col>
      </Row>
    </ErrorBoundary>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Dashboard);
