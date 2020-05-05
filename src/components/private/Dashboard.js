import React, { useState, Suspense } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Translate, I18n } from 'react-redux-i18n';
import { fetchData } from '../../api/endpoints';
import BooksList from '../book/BooksList';
import FilterSelect from '../support/FilterSelect';
import ErrorBoundary from '../support/ErrorBoundary';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

const Dashboard = ({ user={} }) => {
    const [userBooks, setUserBooks] = useState(() => fetchData('/api/user-books', 'GET', {}, { token: user.token }));
    const [statuses] = useState(() => fetchData('/api/support/status', 'GET', {}, { token: user.token }));

    const onFilterChange = (status) => {
        let option = '';
        if (status) {
            option = `?status=${status}`;
        }
        setUserBooks(() => fetchData(`/api/user-books${option}`, 'GET', {}, { token: user.token }));
    };

    return (
        <ErrorBoundary>
            <Row className="mt-4">
                <Col>
                    <h1><Translate value='dashboard.welcome' /></h1>
                </Col>
                <Col xs lg={3} className="text-right">
                    <Suspense fallback={<Spinner animation="border" variant="primary" />}>
                        <FilterSelect 
                            placeholder={I18n.t('dashboard.statusFilterPlaceholder')} 
                            resource={statuses}
                            type="status"
                            onChange={onFilterChange}
                        />
                    </Suspense>
                </Col>
                <Col md="auto" className="text-right">
                    <Button variant="primary" href="/add-book"><Translate value='dashboard.addBook' /></Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Suspense fallback={<Spinner animation="border" variant="primary" />}>
                        <BooksList resource={userBooks} />
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
