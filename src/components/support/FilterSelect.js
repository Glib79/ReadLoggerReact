import React from 'react';
import PropTypes from 'prop-types';
import SelectHandler from '../support/SelectHandler';

const FilterSelect = ({ placeholder='', resource, type='', onChange=f=>f }) => {
    const data = resource.read();

    return (
        <SelectHandler 
            data={data.data[type]}
            placeholder={placeholder}
            onChange={onChange}
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
