import React from "react";

import './row.css';

const Row = (props) => {
  const {
    left, right, onClick, isDeleteDisabled, isRequestingState,
  } = props;
  return (
    <div className="row mb2">
      <div className="col-md-5">
        {left}
      </div>
      <div className="col-md-1 d-flex flex-column">
        <button
          type="button"
          className="btn btn-success central-btn"
          disabled={isRequestingState}
          onClick={onClick('add')}
        >
          <i className="fa fa-plus"/>
        </button>
        <button
          type="button"
          className="btn btn-danger central-btn"
          onClick={onClick('delete')}
          disabled={isDeleteDisabled}
        >
          <i className="fa fa-minus"/>
        </button>
        <button
          type="button"
          className="btn btn-secondary central-btn"
          disabled={isRequestingState}
        >
          <i className="fa fa-retweet"/>
        </button>
      </div>
      <div className="col-md-5">
        {right}
      </div>
    </div>
  )
};

export default Row;
