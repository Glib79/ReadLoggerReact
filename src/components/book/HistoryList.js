import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Translate, Localize } from 'react-redux-i18n';
import RatingHandler from '../support/RatingHandler';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';

const HistoryList = ({ id='', history={}, dictionaries={}, onPageChange=f=>f }) => {
    const data = history.read();
    
    let paginationItems = [];
    for (let number = 1; number <= data.meta.pages; number++) {
        paginationItems.push(
            <Pagination.Item 
                key={number} 
                active={number === data.meta.page}
                onClick={e => onPageChange(id, number)}
            >
                {number}
            </Pagination.Item>,
        );
    }
    
    const renderValue = (key, val) => {
        if (!!!val && key !== 'notes') {
            return '';
        }
    
        switch (key) {
            case 'endDate':
            case 'startDate':
                return <Row key={key}>
                    <Col><Translate value={`historyList.column.${key}`} /></Col>
                    <Col>
                        {val ? <Localize value={val} dateFormat="date.short" /> : '-'}
                    </Col>
                </Row>;
            case 'format':
            case 'language':
            case 'status':
                let dd = dictionaries.data[key].filter((row) => {return String(row.id) === String(val.id);});
                return <Row key={key}>
                    <Col><Translate value={`historyList.column.${key}`} /></Col>
                    <Col>
                        <Translate value={dd[0].translationKey} />
                    </Col>
                </Row>;
            case 'notes':
                return <Row key={key}>
                    <Col><Translate value={`historyList.column.${key}`} /></Col>
                    <Col>
                        {val ? val : '-'}
                    </Col>
                </Row>;
            case 'rating':
                return <Row key={key}>
                    <Col><Translate value={`historyList.column.${key}`} /></Col>
                    <Col>
                        <RatingHandler rating={String(val)} />
                    </Col>
                </Row>;
            default:
                return '';
        }
    };
    
    return (
        <Fragment>
            {data.data.length === 0 
            ? <span><Translate value='historyList.noResults' /></span>
            : <Fragment>
                <Row className="font-weight-bold">
                    <Col xs={3}><Translate value='historyList.date' /></Col>
                    <Col xs={3}><Translate value='historyList.action' /></Col>
                    <Col xs={6}><Translate value='historyList.changes' /></Col>
                </Row>
                {data.data.map((row) => {
                    return <Row key={row.id}  className="border-top">
                        <Col xs={3}><Localize value={row.happenedAt} dateFormat="date.shortAndTime" /></Col>
                        <Col xs={3}><Translate value={`logAction.${row.action}`} /></Col>
                        <Col xs={6}>
                            {Object.keys(row.value).map((key) => {
                                return renderValue(key, row.value[key]);
                            })}
                        </Col>
                    </Row>
                })}
                {data.meta.pages > 1 &&
                    <Row>
                        <Col className="pt-3 text-right">
                            <Pagination className="d-inline-flex">{paginationItems}</Pagination>
                        </Col>
                    </Row>
                }
                </Fragment>
            }
        </Fragment>
    );
};


HistoryList.propTypes = {
    id: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    dictionaries: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
    return {
        id: props.id,
        history: props.history,
        dictionaries: props.dictionaries,
        onPageChange: props.onPageChange
    };
};

export default connect(mapStateToProps)(HistoryList);
    