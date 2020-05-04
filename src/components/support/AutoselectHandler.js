import React, { useState } from 'react';
import { connect } from 'react-redux';
import { I18n } from "react-redux-i18n";
import { PropTypes } from "prop-types";
import axios from 'axios';
import { prepareOptions, handleErrors } from '../../config/api';
import AsyncSelect from 'react-select/async';

const AutoselectHandler = ({ multiple=false, name='', responseToOptions=f=>f, user={}, value=[], setValue=f=>f, handleErrors=f=>f }) => {
    const [input, setInput] = useState('');
    
    const handleInputChange = (newValue) => {
        const inputValue = newValue.replace(/\W/g, '');
        setInput(newValue);
        return inputValue;
    };
    
    const isObject = (a) => {
        return (!!a) && (a.constructor === Object);
    };
    
    const onChange = (selected) => {
        if (multiple) {
            if (isObject(selected)) {
                setValue([
                    ...value, 
                    {
                        id: selected.value,
                        label: selected.label
                    }
                ]);
                setInput('');
            }
        } else {
            if (isObject(selected)) {
                setValue({
                    id: selected.value,
                    label: selected.label
                });
            } else {
                setValue({});
            }
        }
    };
    
    const loadOptions = (inputValue, callback) => {
        const options = prepareOptions(`/api/${name}/${inputValue}`, 'GET', {}, { token: user.token });
      
        axios(options)
        .then(response => {
            callback(responseToOptions(response.data.data));
        })
        .catch(error => {
            handleErrors(error);
        });
    };
    
    return (
        <AsyncSelect
            placeholder={I18n.t(`autoselectHandler.${name}`)}
            isClearable
            loadOptions={loadOptions}
            onInputChange={handleInputChange}
            onChange={onChange}
            value={input}
        />
    );
};

AutoselectHandler.propTypes = {
    multiple: PropTypes.bool,
    name: PropTypes.string.isRequired,
    responseToOptions: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    setValue: PropTypes.func.isRequired,
    handleErrors: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
    return {
        multiple: props.multiple ? true : false,
        name: props.name,
        responseToOptions: props.responseToOptions,
        user: state.user,
        value: props.value,
        setValue: props.setValue
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

export default connect(mapStateToProps, mapDispatchToProps)(AutoselectHandler);
