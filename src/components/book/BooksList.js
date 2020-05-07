import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Translate, Localize, I18n } from 'react-redux-i18n';
import axios from 'axios';
import { prepareOptions, handleErrors } from '../../config/api';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { BoxArrowDown, BoxArrowInUp, PencilSquare, XSquare } from 'react-bootstrap-icons';

const BooksList = ({ dictionaries, locale='en', user={}, userBooks, onPageChange=f=>f, handleErrors=f=>f }) => {
    const data = userBooks.read();
    
    const dict = dictionaries.read();
    const dataFormat = dict.data.format.map(row => {
        return {
            value: row.id,
            label: I18n.t(row.translationKey)
        };
    });

    const dataLanguage = dict.data.language.map(row => {
        return {
            value: row.id,
            symbol: row.symbol,
            label: I18n.t(row.translationKey)
        };
    });
    
    const dataRating = [
        {value: 1, label: I18n.t('rating.1')},
        {value: 2, label: I18n.t('rating.2')},
        {value: 3, label: I18n.t('rating.3')},
        {value: 4, label: I18n.t('rating.4')},
        {value: 5, label: I18n.t('rating.5')}
    ];

    const dataStatus = dict.data.status.map(row => {
        return {
            value: row.id,
            label: I18n.t(row.translationKey)
        };
    });
    
    const [rowData, setRowData] = useState({});
    const [editRow, setEditRow] = useState({});

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

        if (rowData[id].visibility.endDate && !editRow[id].endDate) {
            valid = false;
            setRowData({[id]: {
                ...rowData[id],
                endDateError: true
            }});
        }
        
        return valid;
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

    const onChangeStatus = (e, id) => {
        const visibility = prepareVisibility(e.value);
        setRowData({[id]: {
            ...rowData[id],
            visibility: visibility
        }});
    
        onChangeSelect(e, id, 'status');
    };

    const onChangeSelect = (e, id, field) => {
        let newValue;
        if (field === 'rating') {
            newValue = e ? e.value : null;
        } else {
            if (e) {
                newValue = dict.data[field].filter(row => row.id === e.value);
                newValue = newValue[0];
            } else {
                newValue = {};
            }
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
        
        const availableStatuses = limitStatuses(rowData[id].status.id);
        
        setRowData({[id]: {
            ...rowData[id],
            editing: true,
            visibility: prepareVisibility(rowData[id].status.id),
            availableStatuses: availableStatuses,
            formatDefIndex: dataFormat.findIndex(row => row.value === rowData[id].format.id),
            langDefIndex: dataLanguage.findIndex(row => row.value === rowData[id].language.id),
            ratingDefIndex: dataRating.findIndex(row => row.value === parseInt(rowData[id].rating)),
            statusDefIndex: availableStatuses.findIndex(row => row.value === rowData[id].status.id)
        }});
    };

    const limitStatuses = currentStatus => {
        switch (parseInt(currentStatus)) {
            case 1:
                return dataStatus;
            case 2:
                return dataStatus.filter(row => parseInt(row.value) >= 2);
            case 3:
                return dataStatus.filter(row => parseInt(row.value) === 3);
            case 4:
                return dataStatus.filter(row => parseInt(row.value) >= 2);
            default:
                return dataStatus;
        }
    };

    const prepareVisibility = status => {
        switch (parseInt(status)) {
            case 1:
                return {startDate: false, endDate: false, rating: false};
            case 2:
                return {startDate: true, endDate: false, rating: false};
            case 3:
                return {startDate: true, endDate: true, rating: true};
            case 4:
                return {startDate: true, endDate: false, rating: true};
            default:
                return {startDate: false, endDate: false, rating: false};
        }
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
                                onChange={e => onChangeDate(e, row.id, 'endDate')}
                                dateFormat={I18n.t('date.datepicker')}
                                className="form-control"
                            />
                        </Col> 
                        : <Col>{row.endDate ? <Localize value={row.endDate} dateFormat="date.short" /> : '-'}</Col>
                        }
                        <Col>
                            <Row>
                                {rowData.hasOwnProperty(row.id) && rowData[row.id].editing && rowData[row.id].availableStatuses.length > 1
                                ? <Col>
                                    <Select 
                                        defaultValue={rowData[row.id].availableStatuses[rowData[row.id].statusDefIndex]}
                                        onChange={e => onChangeStatus(e, row.id)}
                                        options={rowData[row.id].availableStatuses}
                                    />
                                </Col>
                                : <Col>
                                    <Translate value={row.status.translationKey} />
                                </Col>
                                }
                                <Col xs='auto'>
                                    {!rowData[row.id] && 
                                    <BoxArrowDown color='blue' onClick={e => openRow(row.id)} />}
                                    {rowData[row.id] && !rowData[row.id].editing &&
                                    <Fragment>
                                        <BoxArrowInUp color='black' onClick={e => closeRow(row.id)} />
                                        <br />
                                        <PencilSquare color='blue' className='mt-2' onClick={e => onClickEdit(row.id)} />
                                    </Fragment> 
                                    }
                                    {rowData[row.id] && rowData[row.id].editing &&
                                    <XSquare color='red' onClick={e => cancelEdit(row.id)} />
                                    }
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className={`border border-top-0 rounded-bottom pb-2 ${bg ? '' : 'bg-light'}`}>
                        {rowData.hasOwnProperty(row.id) && rowData[row.id].loading &&
                            <Col className="text-center">
                                <Spinner animation="border" variant="primary" />
                            </Col>
                        }
                        {rowData.hasOwnProperty(row.id) && !rowData[row.id].loading &&
                            <Col>
                                <hr />
                                <Row>
                                    <Col>
                                        <Translate 
                                            value='booksList.size' 
                                            pages={rowData[row.id].book.size ? rowData[row.id].book.size : '-'}
                                        />
                                    </Col>
                                    {rowData[row.id].editing
                                    ? <Col>
                                        <Row>
                                            <Col xs="auto">
                                                <Translate value='booksList.format' />
                                            </Col>
                                            <Col>
                                                <Select 
                                                    defaultValue={dataFormat[rowData[row.id].formatDefIndex]}
                                                    onChange={e => onChangeSelect(e, row.id, 'format')}
                                                    options={dataFormat}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                    : <Col>
                                        <Translate value='booksList.format' />
                                        <Translate value={rowData[row.id].format.translationKey} />
                                    </Col>
                                    }
                                    {rowData[row.id].editing 
                                    ? <Col>
                                        <Row>
                                            <Col xs="auto">
                                                <Translate value='booksList.language' />
                                            </Col>
                                            <Col>
                                                <Select 
                                                    defaultValue={dataLanguage[rowData[row.id].langDefIndex]}
                                                    onChange={e => onChangeSelect(e, row.id, 'language')}
                                                    options={dataLanguage}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                    : <Col>
                                        <Translate value='booksList.language' />
                                        <Translate value={rowData[row.id].language.translationKey} />
                                    </Col>
                                    }
                                </Row>
                                <Row>
                                    {rowData[row.id].editing && rowData[row.id].visibility.rating
                                    ? <Col>
                                        <Row>
                                            <Col xs='auto'>
                                                <Translate value='booksList.rating' />
                                            </Col>
                                            <Col>
                                                <Select 
                                                    defaultValue={dataRating[rowData[row.id].ratingDefIndex]}
                                                    placeholder={I18n.t('rating.noRating')}
                                                    isClearable
                                                    onChange={e => onChangeSelect(e, row.id, 'rating')}
                                                    options={dataRating}
                                                />
                                            </Col>
                                        </Row>
                                    </Col> 
                                    : <Col>
                                        <Translate value='booksList.rating' />
                                        {rowData[row.id].rating 
                                        ? <Translate value={`rating.${rowData[row.id].rating}`} />
                                        : '-'
                                        }
                                    </Col>
                                    }
                                    <Col>
                                        <Translate value='booksList.added' />
                                        <Localize value={rowData[row.id].createdAt} dateFormat="date.short" />
                                    </Col>
                                    <Col>
                                        <Translate value='booksList.edited' />
                                        <Localize value={rowData[row.id].modifiedAt} dateFormat="date.short" />
                                    </Col>
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
                                        <Button 
                                            variant="primary" 
                                            disabled={rowData[row.id].fetching} 
                                            type={rowData[row.id].fetching ? "" : "submit"}
                                            onClick={e => updateRow(e, row.id)}
                                            className='mt-2'
                                        >
                                            {(rowData[row.id].fetching)
                                              ? <Spinner 
                                                  as="span" 
                                                  animation="border"
                                                  size="sm"
                                                  role="status"
                                                  aria-hidden="true"
                                                />
                                              : <Translate value='booksList.save' />
                                            }
                                        </Button>
                                    </Col>
                                    : <Col>
                                        <Translate value='booksList.notes' />
                                        {rowData[row.id].notes ? rowData[row.id].notes : '-'}
                                    </Col>
                                    }
                                </Row>
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
    handleErrors(error) {
      dispatch(
        handleErrors(error)
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);