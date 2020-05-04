import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Translate } from "react-redux-i18n";
import axios from 'axios';
import { prepareOptions, handleErrors } from '../../config/api';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

const Dashboard = ({ user={}, handleErrors=f=>f }) => {
  const [data, setData] = useState([]);
  const [fetching, setFetching] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      
      const options = prepareOptions('/api/categories', 'GET', {}, { 'Authorization': `Bearer ${user.token}` });
      
      axios(options)
        .then(response => {
          setData(response.data.data);        
        })
        .catch(error => {
          handleErrors(error);
        });
      
      setFetching(false);
    };
    fetchData();
  }, []);
  
  return (
    <Row>
      <Col className="mt-4">
        <h1><Translate value='dashboard.welcome' /></h1>
        {
          fetching
          ? <Spinner animation="border" variant="primary" />
          : Object.keys(data).map(row => {
              return <div key={data[row]['id']}>{data[row]['id']} - {data[row]['name']}</div>;
            })
        }
      </Col>
    </Row>
  );
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  handleErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleErrors(error) {
      dispatch(
        handleErrors(error)
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
