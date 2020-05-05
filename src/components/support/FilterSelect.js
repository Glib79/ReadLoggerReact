import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { I18n } from "react-redux-i18n";

const FilterSelect = ({ placeholder='', resource, type='', onChange=f=>f }) => {
    const data = resource.read();

    const dataOptions = data.data[type].map(row => {
        return {
            value: row.id,
            label: I18n.t(row.translationKey)
        };
    });
    
    const isObject = (a) => {
        return (!!a) && (a.constructor === Object);
    };
    
    const onChangeOption = selected => {
        if (isObject(selected)) {
            onChange(selected.value);
        } else {
            onChange(null);
        }
    };
    
    return (
        <Select 
            placeholder={placeholder}
            onChange={onChangeOption}
            options={dataOptions}
            isClearable
            className="text-left"
        />
    );
};

FilterSelect.propTypes = {
    placeholder: PropTypes.string,
    resource: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default FilterSelect;
