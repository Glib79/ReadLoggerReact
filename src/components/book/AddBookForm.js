import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Translate, I18n } from "react-redux-i18n";
import { addMessage } from '../../redux/actions/messages';
import { prepareOptions, handleErrors } from '../../config/api';
import RatingHandler from '../support/RatingHandler';
import SelectHandler from '../support/SelectHandler';
import StatusSelect from '../support/StatusSelect';
import DatePicker from 'react-datepicker';
import AutoselectHandler from '../support/AutoselectHandler';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';

import 'react-datepicker/dist/react-datepicker.css';

const AddBookForm = ({ locale='en', resource, user={}, addMessage=f=>f, handleErrors=f=>f }) => {
    const data = resource.read();

    const defaultLanguage = data.data.language.filter(row => {
        return row.symbol === locale;
    })[0];

    const [fetching, setFetching] = useState(false);
    const [bookAdded, setBookAdded] = useState(false);

    const [bookNotOnList, setBookNotOnList] = useState(false);
    const [showDates, setShowDates] = useState({
        startDate: false, 
        endDate:false,
        rating: false
    });

    const [endDate, setEndDate] = useState(new Date());
    const [firstName, setFirstName] = useState('');
    const [format, setFormat] = useState('1');
    const [language, setLanguage] = useState(defaultLanguage.id);
    const [lastName, setLastName] = useState('');
    const [notes, setNotes] = useState('');
    const [rating, setRating] = useState();
    const [size, setSize] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [status, setStatus] = useState('1');
    const [subTitle, setSubTitle] = useState('');
    const [title, setTitle] = useState('');
     
    const [authors, setAuthors] = useState([]);
    const [book, setBook] = useState({});
  
    const [authorError, setAuthorError] = useState(false);
    const [bookError, setBookError] = useState(false);
    const [endDateError, setEndDateError] = useState(false);
    const [noAuthorError, setNoAuthorError] = useState(false);
    const [startDateError, setStartDateError] = useState(false);
    const [titleError, setTitleError] = useState(false);
  
    const onSubmit = e => {
        e.preventDefault();
        
        if (validateForm()) {
            setFetching(true);

            let rBook = {};

            if (!bookNotOnList) {
                rBook = {id: book.id};
            } else {
                rBook = {
                    title: title,
                    subTitle: subTitle ? subTitle : null,
                    size: size ? size : null,
                    authors: authors
                };
            }

            const userBook = {
                book: rBook,
                format: {id: format},
                language: {id: language},
                status: {id: status},
                startDate: showDates.startDate ? I18n.l(startDate, { dateFormat: 'date.api' }) : null,
                endDate: showDates.endDate ? I18n.l(endDate, { dateFormat: 'date.api' }) : null,
                rating: showDates.rating ? rating : null,
                notes: notes
            };
            
            const options = prepareOptions('/api/user-book', 'POST', userBook, { token: user.token });

            axios(options)
              .then(response => {
                addMessage('addBookForm.successMessage', 'success');
        
                setBookAdded(true);
              })
              .catch(error => {
                handleErrors(error);
              });

            setFetching(false);
        }
    };
    
    const validateForm = () => {
        let isValid = true;
        
        setBookError(false);
        setTitleError(false);
        setNoAuthorError(false);
        if (!bookNotOnList) {
            if (!book.id) {
                setBookError(true);
                isValid = false;
            }
        } else {
            if (!title) {
                setTitleError(true);
                isValid = false;
            }
            if (authors.length === 0) {
                setNoAuthorError(true);
                isValid = false;
            }
        }
        
        setStartDateError(false);
        setEndDateError(false);
        if (showDates.startDate) {
            if (!startDate) {
                setStartDateError(true);
                isValid = false;
            }
        }
        if (showDates.endDate) {
            if (!endDate || startDate.getTime() > endDate.getTime()) {
                setEndDateError(true);
                isValid = false;
            }
        }
        
        return isValid;
    };

    const authorsOptions = (data) => {
        return data.map(row => {
            return {
                label: `${row.firstName} ${row.lastName}`,
                value: row.id
            };
        });
    };
    
    const booksOptions = (data) => {
        return data.map(row => {
            const authors = row.authors.reduce((accumulator, author) => {
               return accumulator 
               ? `${accumulator}, ${author.firstName} ${author.lastName}`
               : `${author.firstName} ${author.lastName}`; 
            }, '');
            
            return {
                label: authors ? `${row.title} - (${authors})` : row.title,
                value: row.id
            };
        });
    };
    
    const onChangeBookNotOnList = () => {
        setBookNotOnList(!bookNotOnList);
    };

    const onChangeEndDate = date => {
        setEndDate(date);
    };
  
    const onChangeFirstName = e => {
        setFirstName(e.target.value);
    };

    const onChangeFormat = selected => {
        setFormat(selected);
    };

    const onChangeLanguage = selected => {
        setLanguage(selected);
    };

    const onChangeLastName = e => {
        setLastName(e.target.value);
    };

    const onChangeNotes = e => {
        setNotes(e.target.value);
    };

    const onChangeRating = value => {
        setRating(value);
    };

    const onChangeSize = e => {
        setSize(e.target.value);
    };

    const onChangeStartDate = date => {
       setStartDate(date);
    };
  
    const onChangeStatus = (value, visibility) => {
        setStatus(value);
        setShowDates(visibility);
    };

    const onChangeSubTitle = e => {
        setSubTitle(e.target.value);
    };
    
    const onChangeTitle = e => {
        setTitle(e.target.value);
        
        setTitleError(false);
        if (!e.target.value) {
            setTitleError(true);
        }
    };
    
    const onClickAddAuthor = () => {
        setAuthorError(false);
        if (firstName.length === 0 || lastName.length === 0) {
            setAuthorError(true);
            return;
        }
        
        setAuthors([
            ...authors,
            {
                firstName: firstName,
                lastName: lastName,
                label: `${firstName} ${lastName}`
            }
        ]);
        setFirstName('');
        setLastName('');
    };
    
    const onClickRemoveAuthor = e => {
        setAuthors(
            authors.filter((row, i) => {
                return i !== parseInt(e.target.value);
            })
        );
    };
    
    if (bookAdded) {
        return(<Redirect push to="/dashboard" />);
    };
    
    return (
        <Form onSubmit={onSubmit}>
            {!bookNotOnList &&
            <Form.Group controlId="bookAutoselect">
                <Form.Label>
                    <Translate value='addBookForm.bookTitle' />  
                </Form.Label>
                {bookError && <Form.Text className="text-danger">
                    <Translate value='addBookForm.bookError' />
                </Form.Text>}
                <AutoselectHandler 
                    name='books'
                    setValue={setBook}
                    responseToOptions={booksOptions}
                />
            </Form.Group>
            }
            <Form.Group controlId="bookNotOnList">
                <Form.Check 
                    custom
                    value={bookNotOnList}
                    onChange={onChangeBookNotOnList}
                    type='checkbox'
                    id='bookNotOnListCheckbox'
                    label={I18n.t('addBookForm.bookNotOnList')}
                />
            </Form.Group>
            {bookNotOnList &&
            <Form.Group controlId="bookNewBookForm" className='pl-4'>
                <Form.Group controlId="bookTitle">
                    <Form.Label>
                        <Translate value='addBookForm.bookNewBook' />  
                    </Form.Label>
                    {titleError && <Form.Text className="text-danger">
                        <Translate value='addBookForm.titleError' />
                    </Form.Text>}
                    <Form.Control 
                        type="text" 
                        value={title}
                        onChange={onChangeTitle}
                        placeholder={I18n.t('addBookForm.title')} 
                    />
                </Form.Group>
                <Form.Group controlId="bookSubTitle">
                    <Form.Control 
                        type="text" 
                        value={subTitle}
                        onChange={onChangeSubTitle}
                        placeholder={I18n.t('addBookForm.subTitle')} 
                    />
                </Form.Group>
                <Form.Group controlId="bookSize">
                    <Form.Control 
                        type="number" 
                        value={size}
                        onChange={onChangeSize}
                        placeholder={I18n.t('addBookForm.size')} 
                    />
                </Form.Group>
                {authors.length > 0 && <Form.Group controlId="bookAuthorsList">
                    <Form.Label>
                        <Translate value='addBookForm.authors' />  
                    </Form.Label>
                    <ListGroup>
                        {authors.map((row, i) => {
                            return (<ListGroup.Item key={i} className="d-flex">
                                {row.label}
                                <Button 
                                    value={i}
                                    variant="outline-danger" 
                                    size="sm" 
                                    className="ml-auto py-0 px-1" 
                                    onClick={onClickRemoveAuthor}>
                                    X
                                </Button>
                            </ListGroup.Item>);
                        })}
                    </ListGroup>
                </Form.Group>}
                {noAuthorError && <Form.Text className="text-danger">
                    <Translate value='addBookForm.noAuthorError' />
                </Form.Text>}
                <Form.Group controlId="bookAuthorAutoselect">
                    <Form.Label>
                        <Translate value='addBookForm.authorTitle' />  
                    </Form.Label>
                    <AutoselectHandler 
                        name='authors'
                        value={authors}
                        setValue={setAuthors}
                        responseToOptions={authorsOptions}
                        multiple={true}
                    />
                </Form.Group>
                <Form.Label>
                    <Translate value='addBookForm.authorNotOnList' />  
                </Form.Label>
                {authorError && <Form.Text className="text-danger">
                    <Translate value='addBookForm.authorError' />
                </Form.Text>}
                <Form.Row>
                    <Form.Group as={Col} controlId="bookAuthorFirstName">
                        <Form.Control 
                            type="text" 
                            value={firstName}
                            onChange={onChangeFirstName}
                            placeholder={I18n.t('addBookForm.firstName')} 
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="bookAuthorLastName">
                        <Form.Control 
                            type="text" 
                            value={lastName}
                            onChange={onChangeLastName}
                            placeholder={I18n.t('addBookForm.lastName')} 
                        />
                    </Form.Group>
                    <Form.Group as={Col}  controlId="bookAuthorAddButton">
                        <Button variant="primary" onClick={onClickAddAuthor}>+</Button>
                    </Form.Group>
                </Form.Row>
                <hr />
            </Form.Group>
            }
            <Form.Group controlId="bookFormatSelect">
                <Form.Label>
                    <Translate value='addBookForm.bookFormat' />  
                </Form.Label>
                <SelectHandler 
                    data={data.data.format}
                    defId='1'
                    onChange={onChangeFormat}
                />
            </Form.Group>
            <Form.Group controlId="bookLanguageSelect">
                <Form.Label>
                    <Translate value='addBookForm.bookLanguage' />  
                </Form.Label>
                <SelectHandler 
                    data={data.data.language}
                    defId={defaultLanguage.id}
                    onChange={onChangeLanguage}
                />
            </Form.Group>
            <Form.Group controlId="bookStatusSelect">
                <Form.Label>
                    <Translate value='addBookForm.bookStatus' />  
                </Form.Label>
                <StatusSelect 
                    data={data.data.status}
                    defId='1'
                    onChange={onChangeStatus}
                />
            </Form.Group>
            {showDates.startDate &&
            <Form.Group controlId="bookStartDatePicker">
                <Form.Label>
                    <Translate value='addBookForm.bookStartDate' />  
                </Form.Label>
                {startDateError && <Form.Text className="text-danger">
                    <Translate value='addBookForm.startDateError' />
                </Form.Text>}
                <br />
                <DatePicker
                    locale={locale}
                    selected={startDate}
                    onChange={onChangeStartDate}
                    dateFormat={I18n.t('date.datepicker')}
                    className="form-control"
                />
            </Form.Group>
            }
            {showDates.endDate && 
            <Form.Group controlId="bookEndDatePicker">
                <Form.Label>
                    <Translate value='addBookForm.bookEndDate' />  
                </Form.Label>
                {endDateError && <Form.Text className="text-danger">
                    <Translate value='addBookForm.endDateError' />
                </Form.Text>}
                <br />
                <DatePicker
                    locale={locale}
                    selected={endDate}
                    minDate={startDate}
                    onChange={onChangeEndDate}
                    dateFormat={I18n.t('date.datepicker')}
                    className="form-control"
                />
            </Form.Group>
            }
            {showDates.rating &&
            <Form.Group controlId="bookRatingSelect">
                <Form.Label>
                    <Translate value='addBookForm.bookRating' />
                </Form.Label>
                <RatingHandler 
                    rating={rating}
                    onChange={onChangeRating}
                />
            </Form.Group>
            }
            <Form.Group controlId="bookNotesTextarea">
                <Form.Label>
                    <Translate value='addBookForm.bookNotes' />
                </Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows="3" 
                    value={notes} 
                    onChange={onChangeNotes} 
                />
            </Form.Group>
            <Button variant="primary" disabled={fetching} type={fetching ? "" : "submit"}>
                {(fetching)
                  ? <Spinner 
                      as="span" 
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  : <Translate value='addBookForm.submit' />
                }
            </Button>
            <Button variant='outline-secondary' className='ml-2' onClick={e => setBookAdded(true)}>
                <Translate value='addBookForm.cancel' />
            </Button>
        </Form>
    );
};

AddBookForm.propTypes = {
    locale: PropTypes.string.isRequired,
    resource: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    addMessage: PropTypes.func.isRequired,
    handleErrors: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
    return {
        locale: state.i18n.locale,
        resouce: props.resource,
        user: state.user
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

export default connect(mapStateToProps, mapDispatchToProps)(AddBookForm);
