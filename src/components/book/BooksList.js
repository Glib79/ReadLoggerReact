import React, { Fragment, Suspense, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Translate, Localize, I18n } from 'react-redux-i18n';
import axios from 'axios';
import { addMessage } from '../../redux/actions/messages';
import { prepareOptions, handleErrors } from '../../config/api';
import { fetchData } from '../../api/endpoints';
import HistoryList from './HistoryList';
import RatingHandler from '../support/RatingHandler';
import SelectHandler from '../support/SelectHandler';
import StatusSelect, { prepareVisibility } from '../support/StatusSelect';
import DatePicker from 'react-datepicker';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Tooltip from 'react-bootstrap/Tooltip';
import { CaretDownFill, CaretUpFill } from 'react-bootstrap-icons';

const BooksList = ({ dictionaries, locale='en', user={}, userBooks, onPageChange=f=>f, addMessage=f=>f, handleErrors=f=>f }) => {
    const data = userBooks.read();
    const dict = dictionaries.read();

    const [rowData, setRowData] = useState({});
    const [editRow, setEditRow] = useState({});
    const [history, setHistory] = useState({});

    let paginationItems = [];
    for (let number = 1; number <= data.meta.pages; number++) {
        paginationItems.push(
            <Pagination.Item 
                key={number} 
                active={number === data.meta.page}
                onClick={e => onPageChange(number)}
            >
                {number}
            </Pagination.Item>,
        );
    }

    const closeRow = id => {
        setRowData({});
    };
    
    const deleteRow = id => {
        const confirm = window.confirm(I18n.t('booksList.deleteConfirmation')); 
        if (confirm === true) { 
            setRowData({[id]: {
                ...rowData[id],
                loading: true
            }});

            const options = prepareOptions(`/api/user-book/${id}`, 'DELETE', null, { token: user.token });
            axios(options)
            .then(response => {
                addMessage('booksList.successDelete', 'success');
                setRowData({});
                onPageChange(data.meta.page);
            })
            .catch(error => {
                handleErrors(error);
                setRowData({[id]: {
                    ...rowData[id],
                    loading: false
                }});
            });
        }  
    };
    
    const openRow = id => {
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
    
    const toggleHistory = id => {
        if (!!!rowData[id].history) {
            setHistory(() => fetchData(`/api/log/${id}`, 'GET', {}, { token: user.token }));
        }
        setRowData({[id]: {
            ...rowData[id],
            history: !!!rowData[id].history
        }});
    };
    
    const updateRow = (e, id) => {
        e.preventDefault();
        if (validateRow(id)) {
            setRowData({[id]: {
                ...rowData[id],
                fetching: true
            }});

            const updateData = {
                format: {id: editRow[id].format.id},
                language: {id: editRow[id].language.id},
                status: {id: editRow[id].status.id},
                startDate: rowData[id].visibility.startDate ? I18n.l(editRow[id].startDate, { dateFormat: 'date.api' }) : null,
                endDate: rowData[id].visibility.endDate ? I18n.l(editRow[id].endDate, { dateFormat: 'date.api' }) : null,
                rating: rowData[id].visibility.rating ? editRow[id].rating : null,
                notes: editRow[id].notes
            };

            const options = prepareOptions(`/api/user-book/${id}`, 'PATCH', updateData, { token: user.token });

            axios(options)
            .then(response => {
                setRowData({[id]: {
                    ...editRow[id],
                    fetching: false,
                    editing: false
                }});
                onPageChange(data.meta.page);
            })
            .catch(error => {
                handleErrors(error);
                setRowData({[id]: {
                    ...rowData[id],
                    fetching: false
                }});
            });
        }
    };
    
    const validateRow = id => {
        let valid = true;
        setRowData({[id]: {
            ...rowData[id],
            startDateError: false,
            endDateError: false
        }});

        if (rowData[id].visibility.startDate && !editRow[id].startDate) {
            valid = false;
            setRowData({[id]: {
                ...rowData[id],
                startDateError: true
            }});
        }

        if (rowData[id].visibility.endDate && (!editRow[id].endDate || editRow[id].startDate.getTime() > editRow[id].endDate.getTime())) {
            valid = false;
            setRowData({[id]: {
                ...rowData[id],
                endDateError: true
            }});
        }
        
        return valid;
    };
    
    const rowBackground = status => {
        switch (parseInt(status)) {
            case 1:
                return 'bg-planned';
            case 2:
                return 'bg-during';
            case 3:
                return 'bg-finished';
            case 4:
                return 'bg-abandoned';
            default:
                return 'bg-light';
        }
    };
    
    const cancelEdit = id => {
        setRowData({[id]: {
            ...rowData[id],
            editing: false
        }});
    };

    const onChangeDate = (e, id, field) => {
        setEditRow({[id]: {
            ...editRow[id],
            [field]: e
        }});
    };

    const onChangeValue = (e, id, field) => {
        setEditRow({[id]: {
            ...editRow[id],
            [field]: e.target.value
        }});
    };

    const onChangeStatus = (status, visibility, id) => {
        setRowData({[id]: {
            ...rowData[id],
            visibility: visibility
        }});
    
        onChangeSelect(status, id, 'status');
    };

    const onChangeSelect = (val, id, field) => {
        let newValue;
        if (field === 'rating') {
            newValue = val;
        } else {
            newValue = val ? dict.data[field].filter(row => row.id === val)[0] : {};
        }
        
        setEditRow({[id]: {
            ...editRow[id],
            [field]: newValue
        }}); 
    };

    const onClickEdit = id => {
        let startDate = new Date();
        let endDate = new Date();
        if (editRow.hasOwnProperty(id)) {
            startDate = editRow[id].startDate;
        } else if (rowData[id].startDate) {
             startDate = new Date(rowData[id].startDate);
        }
        if (editRow.hasOwnProperty(id)) {
            endDate = editRow[id].endDate;
        } else if (rowData[id].endDate) {
             endDate = new Date(rowData[id].endDate);
        }
        setEditRow({[id]: { 
            ...rowData[id],
            startDate: startDate,
            endDate: endDate
        }});
        
        setRowData({[id]: {
            ...rowData[id],
            editing: true,
            visibility: prepareVisibility(rowData[id].status.id)
        }});
    };
    
    const onHistoryPageChange = (id, page) => {
        setHistory(() => fetchData(`/api/log/${id}?page=${page}`, 'GET', {}, { token: user.token }));
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
                    return <Fragment key={row.id}>
                    <Row 
                        className={`border border-bottom-0 rounded-top pt-2 ${rowBackground(row.status.id)}`}
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
                        {rowData.hasOwnProperty(row.id) && rowData[row.id].editing && rowData[row.id].visibility.startDate
                        ? <Col>
                            {rowData[row.id].startDateError && 
                            <span className="text-danger"><small><Translate value='booksList.startDateError' /></small></span>
                            }
                            <DatePicker
                                locale={locale}
                                selected={editRow[row.id].startDate}
                                onChange={e => onChangeDate(e, row.id, 'startDate')}
                                dateFormat={I18n.t('date.datepicker')}
                                className="form-control"
                            />
                        </Col> 
                        : <Col>{row.startDate ? <Localize value={row.startDate} dateFormat="date.short" /> : '-'}</Col>
                        }
                        {rowData.hasOwnProperty(row.id) && rowData[row.id].editing && rowData[row.id].visibility.endDate
                        ? <Col>
                            {rowData[row.id].endDateError && 
                            <span className="text-danger"><small><Translate value='booksList.endDateError' /></small></span>
                            }
                            <DatePicker
                                locale={locale}
                                selected={editRow[row.id].endDate}
                                minDate={editRow[row.id].startDate}
                                onChange={e => onChangeDate(e, row.id, 'endDate')}
                                dateFormat={I18n.t('date.datepicker')}
                                className="form-control"
                            />
                        </Col> 
                        : <Col>{row.endDate ? <Localize value={row.endDate} dateFormat="date.short" /> : '-'}</Col>
                        }
                        <Col>
                            <Row>
                                {rowData.hasOwnProperty(row.id) && rowData[row.id].editing && parseInt(rowData[row.id].status.id) !== 3
                                ? <Col>
                                    <StatusSelect
                                        data={dict.data.status}
                                        defId={rowData[row.id].status.id}
                                        onChange={(value, visibility) => onChangeStatus(value, visibility, row.id)}
                                    />
                                </Col>
                                : <Col>
                                    <Translate value={row.status.translationKey} />
                                </Col>
                                }
                                <Col xs='auto'>
                                    {!rowData[row.id] && 
                                    <OverlayTrigger 
                                        overlay={<Tooltip id={`tooltip-open-row-${row.id}`}>
                                            <Translate value='booksList.tooltip.openRow' />
                                        </Tooltip>}
                                    >                    
                                        <CaretDownFill color='black' className='cursor-pointer' onClick={e => openRow(row.id)} />
                                    </OverlayTrigger>
                                    }
                                    {rowData[row.id] && !rowData[row.id].editing &&
                                    <OverlayTrigger 
                                        overlay={<Tooltip id={`tooltip-close-row-${row.id}`}>
                                            <Translate value='booksList.tooltip.closeRow' />
                                        </Tooltip>}
                                    >                    
                                        <CaretUpFill color='black' className='cursor-pointer' onClick={e => closeRow(row.id)} />
                                    </OverlayTrigger>
                                    }
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className={`border border-top-0 rounded-bottom pb-2 ${rowData.hasOwnProperty(row.id) ? 'bg-light' : rowBackground(row.status.id)}`}>
                        {rowData.hasOwnProperty(row.id) && rowData[row.id].loading &&
                            <Col className="text-center pt-3">
                                <Spinner animation="border" variant="primary" />
                            </Col>
                        }
                        {rowData.hasOwnProperty(row.id) && !rowData[row.id].loading &&
                            <Col className="pt-3">
                                <Row>
                                    <Col>
                                        <Translate value='booksList.sizeLabel' />
                                    </Col>
                                    <Col>
                                        <Translate 
                                            value='booksList.size' 
                                            pages={rowData[row.id].book.size ? rowData[row.id].book.size : '-'}
                                        />
                                    </Col>
                                    <Col>
                                        <Translate value='booksList.format' />
                                    </Col>
                                    <Col>
                                        {rowData[row.id].editing
                                        ? <SelectHandler 
                                            data={dict.data.format}
                                            defId={rowData[row.id].format.id}
                                            onChange={e => onChangeSelect(e, row.id, 'format')}
                                        />
                                        : <Translate value={rowData[row.id].format.translationKey} />
                                        }
                                    </Col>
                                    <Col></Col>
                                    <Col></Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Translate value='booksList.rating' />
                                    </Col>
                                    <Col>
                                        {rowData[row.id].editing && rowData[row.id].visibility.rating
                                        ? <RatingHandler 
                                            rating={editRow[row.id].rating}
                                            onChange={e => onChangeSelect(e, row.id, 'rating')}
                                        />
                                        : <RatingHandler 
                                            rating={rowData[row.id].rating}
                                        />
                                        }
                                    </Col>
                                    <Col>
                                        <Translate value='booksList.language' />
                                    </Col>
                                    <Col>
                                        {rowData[row.id].editing 
                                        ? <SelectHandler 
                                            data={dict.data.language}
                                            defId={rowData[row.id].language.id}
                                            onChange={e => onChangeSelect(e, row.id, 'language')}
                                        />
                                        : <Translate value={rowData[row.id].language.translationKey} />
                                        }
                                    </Col>
                                    <Col></Col>
                                    <Col></Col>
                                </Row>
                                <Row>
                                    {rowData[row.id].editing 
                                    ? <Col>
                                        <Translate value='booksList.notes' />
                                        <Form.Control 
                                            as="textarea" 
                                            rows="3" 
                                            value={editRow[row.id].notes} 
                                            onChange={e => onChangeValue(e, row.id, 'notes')} 
                                        />
                                    </Col>
                                    : <Col>
                                        <Translate value='booksList.notes' />
                                        {rowData[row.id].notes ? rowData[row.id].notes : '-'}
                                    </Col>
                                    }
                                </Row>
                                <hr />
                                {rowData[row.id].editing 
                                ? <Row>
                                    <Col>
                                        <Button 
                                            variant="primary"
                                            size="sm"
                                            disabled={rowData[row.id].fetching} 
                                            type={rowData[row.id].fetching ? "" : "submit"}
                                            onClick={e => updateRow(e, row.id)}
                                            className='ml-3'
                                        >
                                            {(rowData[row.id].fetching)
                                              ? <Spinner 
                                                  as="span" 
                                                  animation="border"
                                                  size="sm"
                                                  role="status"
                                                  aria-hidden="true"
                                                />
                                              : <Translate value='booksList.saveButton' />
                                            }
                                        </Button>
                                        <Button 
                                            variant="outline-secondary"
                                            size="sm"
                                            className='ml-2'
                                            onClick={e => cancelEdit(row.id)}
                                        >
                                            <Translate value='booksList.cancelButton' />
                                        </Button>
                                    </Col>
                                    <Col className="text-center">
                                        <Button 
                                            variant="outline-primary" 
                                            size="sm"
                                            className="ml-3"
                                            onClick={e => toggleHistory(row.id)}
                                        >
                                            <Translate value='booksList.historyButton' />
                                        </Button>
                                    </Col>
                                    <Col></Col>
                                </Row>
                                : <Row>
                                    <Col>
                                        <Button 
                                            variant="outline-primary" 
                                            size="sm"
                                            className="ml-3"
                                            onClick={e => onClickEdit(row.id)}
                                        >
                                            <Translate value='booksList.editButton' />
                                        </Button>
                                    </Col>
                                    <Col className="text-center">
                                        <Button 
                                            variant="outline-primary" 
                                            size="sm"
                                            className="ml-3"
                                            onClick={e => toggleHistory(row.id)}
                                        >
                                            <Translate value='booksList.historyButton' />
                                        </Button>
                                    </Col>
                                    <Col className="text-right">
                                        <Button 
                                            variant="outline-danger"
                                            size="sm"
                                            className='ml-2'
                                            onClick={e => deleteRow(row.id)}
                                        >
                                            <Translate value='booksList.deleteButton' />
                                        </Button>
                                    </Col>
                                </Row>
                                }
                                {(rowData[row.id].history) &&
                                <Row>
                                    <Col>
                                        <hr />
                                        <Suspense fallback={<Spinner animation="border" variant="primary" />}>
                                            <HistoryList id={row.id} history={history} dictionaries={dict} onPageChange={onHistoryPageChange} />
                                        </Suspense>
                                    </Col>
                                </Row>
                                }
                            </Col>
                        }
                    </Row>
                    </Fragment>;
                })}
                {data.meta.pages > 1 &&
                    <Row>
                        <Col className="pt-3 text-right">
                            <Pagination className="d-inline-flex">{paginationItems}</Pagination>
                        </Col>
                    </Row>
                }
            </Container>
            }
            {data.data.length === 0 && <div>
                <Translate value='booksList.noBooks' />
            </div>}
        </div>
    );
};

BooksList.propTypes = {
  dictionaries: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  userBooks: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  handleErrors: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
    return {
        dictionaries: props.dictionaries,
        locale: state.i18n.locale,
        user: state.user,
        userBooks: props.userBooks,
        onPageChange: props.onPageChange
    };
};

const mapDispatchToProps = dispatch => {
  return {
    addMessage(message, type) {
      dispatch(
        addMessage(message, type)
      );
    },
    handleErrors(error) {
      dispatch(
        handleErrors(error)
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);