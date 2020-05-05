import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Translate, Localize } from 'react-redux-i18n';
import axios from 'axios';
import { prepareOptions, handleErrors } from '../../config/api';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

const BooksList = ({ resource, user={}, handleErrors=f=>f }) => {
    const data = resource.read();
    
    const [rowData, setRowData] = useState({});

    const toggleRow = (e, id) => {
        setRowData({[id]: {loading: true}});
        
        const options = prepareOptions(`/api/user-book/${id}`, 'GET', null, { token: user.token });

        axios(options)
        .then(response => {
            setRowData({[id]: {
                ...response.data.data,
                loading: false
            }});
        })
        .catch(error => {
          handleErrors(error);
        });
    };

    return (
        <div>
            {data.data.length > 0 &&
            <Container>
                <Row className="border rounded py-2 font-weight-bold">
                    <Col><Translate value='booksList.title' /></Col>
                    <Col><Translate value='booksList.author' /></Col>
                    <Col><Translate value='booksList.startDate' /></Col>
                    <Col><Translate value='booksList.endDate' /></Col>
                    <Col><Translate value='booksList.status' /></Col>
                </Row>
                {data.data.map((row, i) => {
                    let bg = i%2;
                    return <Fragment key={row.id}>
                    <Row 
                        className={`border border-bottom-0 rounded-top pt-2 ${bg ? '' : 'bg-light'}`}
                        onClick={e => toggleRow(e, row.id)}
                    >
                        <Col>
                            {row.book.title}<br />
                            {row.book.subTitle && 
                                <small className="text-muted">{row.book.subTitle}</small>
                            }
                        </Col>
                        <Col>
                            {row.book.authors.map(author => {
                              return <div key={author.id}>{author.firstName} {author.lastName}</div>;
                            })}
                        </Col>
                        <Col>{row.startDate ? <Localize value={row.startDate} dateFormat="date.short" /> : '-'}</Col>
                        <Col>{row.endDate ? <Localize value={row.endDate} dateFormat="date.short" /> : '-'}</Col>
                        <Col><Translate value={row.status.translationKey} /></Col>
                    </Row>
                    <Row className={`border border-top-0 rounded-bottom pb-2 ${bg ? '' : 'bg-light'}`}>
                        {rowData.hasOwnProperty(row.id) && rowData[row.id].loading &&
                            <Col className="text-center">
                                <Spinner animation="border" variant="primary" />
                            </Col>
                        }
                        {rowData.hasOwnProperty(row.id) && !rowData[row.id].loading &&
                            <Col>{rowData[row.id].id}</Col>
                        }
                    </Row>
                    </Fragment>;
                })}
            </Container>
            }
            {data.data.length === 0 && <div>
                <Translate value='booksList.noBooks' />
            </div>}
        </div>
    );
};

BooksList.propTypes = {
  resource: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleErrors: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
    return {
        resouce: props.resource,
        user: state.user
    };
};

const mapDispatchToProps = dispatch => {
  return {
    handleErrors(error) {
      dispatch(
        handleErrors(error)
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);