import React from "react";
import PropTypes from "prop-types";

const Ratings = ({...props}) => {
  const {rating} = props;

  return (
    <div className="ratings">
      <div className="ratings__item" data-item-value={rating}>★</div>
      <div className="ratings__item" data-item-value={rating}>★</div>
      <div className="ratings__item" data-item-value={rating}>★</div>
      <div className="ratings__item" data-item-value={rating}>★</div>
      <div className="ratings__item" data-item-value={rating}>★</div>
    </div>
  );
};

Ratings.propTypes = {
  rating: PropTypes.number,
};

export default Ratings;
