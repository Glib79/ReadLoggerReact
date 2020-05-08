import React from 'react';
import { PropTypes } from "prop-types";
import { I18n } from 'react-redux-i18n';
import Select from 'react-select';

const SelectHandler = ({className=null, data=[], defId=null, placeholder=null, onChange=f=>f}) => {
    const options = data.map(row => {
        return {
            value: row.id,
            label: I18n.t(row.translationKey)
        };
    });
    
    const defOption = defId ? options.findIndex(option => option.value === defId) : null;
    
    const onChangeOption = selected => {
        if (selected) {
            onChange(selected.value);
        } else {
            onChange(null);
        }
    };
    
    return (
        <Select 
            defaultValue={defOption !== null ? options[defOption] : null}
            onChange={onChangeOption}
            options={options}
            placeholder={placeholder}
            isClearable={placeholder ? true : false}
            className={className}
        />
    );
};

SelectHandler.propTypes = {
    className: PropTypes.string,
    data: PropTypes.array.isRequired,
    defId: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

export default SelectHandler;