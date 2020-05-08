import React from 'react';
import PropTypes from 'prop-types';
import SelectHandler from '../support/SelectHandler';

export const prepareVisibility = status => {
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

const StatusSelect = ({ data=[], defId=null, onChange=f=>f }) => {
    const limitStatuses = currentStatus => {
        switch (parseInt(currentStatus)) {
            case 1:
                return data;
            case 2:
                return data.filter(row => parseInt(row.id) >= 2);
            case 3:
                return data.filter(row => parseInt(row.id) === 3);
            case 4:
                return data.filter(row => parseInt(row.id) >= 2);
            default:
                return data;
        }
    };
    
    const onChangeStatus = status => {
        onChange(status, prepareVisibility(status));
    };
    
    
    return (
        <SelectHandler 
            data={limitStatuses(defId)}
            defId={defId}
            onChange={onChangeStatus}
        />
    );
};

StatusSelect.propTypes = {
    data: PropTypes.array.isRequired,
    defId: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

export default StatusSelect;
