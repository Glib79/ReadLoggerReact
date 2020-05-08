import React from 'react';
import PropTypes from 'prop-types';
import Rating from 'react-ratings-declarative';

const RatingHandler = ({ rating, onChange=null }) => {
    const value = rating ? parseInt(rating) : 0;

    const onChangeRating = rating => {
        if (onChange) {
            onChange(String(rating));
        }
    };
    
    return (
          <Rating
            rating={value}
            widgetDimensions='20px'
            widgetSpacings='3px'
            widgetRatedColors='#ffc107'
            widgetHoverColors='#ffc107'
            changeRating={onChange ? onChangeRating : null}
          >
            <Rating.Widget />
            <Rating.Widget />
            <Rating.Widget />
            <Rating.Widget />
            <Rating.Widget />
          </Rating>
    );
};

RatingHandler.propTypes = {
    rating: PropTypes.string,
    onChange: PropTypes.func
};

export default RatingHandler;
