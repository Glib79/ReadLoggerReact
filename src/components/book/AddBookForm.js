import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Translate, I18n } from "react-redux-i18n";
import { addMessage } from '../../redux/actions/messages';
import { handleErrors } from '../../config/api';
import Select from 'react-select';
import AutoselectHandler from '../support/AutoselectHandler';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';

const AddBookForm = ({ locale='en', resource, addMessage=f=>f, handleErrors=f=>f }) => {
    const data = resource.read();
    const dataFormat = data.data.format.map(row => {
        return {
            value: row.id,
            label: I18n.t(row.translationKey)
        };
    });

    const dataLanguage = data.data.language.map(row => {
        return {
            value: row.id,
            symbol: row.symbol,
            label: I18n.t(row.translationKey)
        };
    });
    
    const defaultLanguage = dataLanguage.findIndex((element, index, array) => {
        return element.symbol === locale;
    });
    
    const [fetching, setFetching] = useState(false);

    const [bookNotOnList, setBookNotOnList] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [format, setFormat] = useState(dataFormat[0].value);
    const [language, setLanguage] = useState(dataLanguage[0].value);
    const [lastName, setLastName] = useState('');
    const [size, setSize] = useState();
    const [subTitle, setSubTitle] = useState('');
    const [title, setTitle] = useState('');
     
    const [authors, setAuthors] = useState([]);
    const [book, setBook] = useState({});
  
    const [authorError, setAuthorError] = useState(false);
  
    const onSubmit = e => {
        e.preventDefault();
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

    const onChangeFirstName = e => {
        setFirstName(e.target.value);
    };

    const onChangeFormat = selected => {
        setFormat(selected.value);
    };

    const onChangeLanguage = selected => {
        setLanguage(selected.value);
    };

    const onChangeLastName = e => {
        setLastName(e.target.value);
    };

    const onChangeSize = e => {
        setSize(e.target.value);
    };

    const onChangeSubTitle = e => {
        setSubTitle(e.target.value);
    };
    
    const onChangeTitle = e => {
        setTitle(e.target.value);
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
    
    return (
        <Form onSubmit={onSubmit}>
            {!bookNotOnList &&
            <Form.Group controlId="bookAutoselect">
                <Form.Label>
                    <Translate value='addBookForm.bookTitle' />  
                </Form.Label>
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
            <Form.Group controlId="bookNewBookForm">
                <Form.Group controlId="bookTitle">
                    <Form.Label>
                        <Translate value='addBookForm.bookNewBook' />  
                    </Form.Label>
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
            </Form.Group>
            }
            <Form.Group controlId="bookFormatSelect">
                <Form.Label>
                    <Translate value='addBookForm.bookFormat' />  
                </Form.Label>
                <Select 
                    defaultValue={dataFormat[0]}
                    onChange={onChangeFormat}
                    options={dataFormat}
                />
            </Form.Group>
            <Form.Group controlId="bookLanguageSelect">
                <Form.Label>
                    <Translate value='addBookForm.bookLanguage' />  
                </Form.Label>
                <Select 
                    defaultValue={dataLanguage[defaultLanguage]}
                    onChange={onChangeLanguage}
                    options={dataLanguage}
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
        </Form>
    );
};

AddBookForm.propTypes = {
    locale: PropTypes.string.isRequired,
    resource: PropTypes.object.isRequired,
    addMessage: PropTypes.func.isRequired,
    handleErrors: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
    return {
        locale: state.i18n.locale,
        resouce: props.resource
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
