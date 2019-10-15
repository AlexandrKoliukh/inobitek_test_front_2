import React from "react";

import './row.css';

const Row = (props) => {
  const {
    left, right, onClick, isDeleteDisabled, isRequestingState, refreshNodes,
  } = props;
  return (
    <div className="row mb2">
      <div className="col-md-7">
        {left}
      </div>
      <div className="col-md-5 row right-container fixed-top">
        <div className="d-flex flex-column col-md-2">
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
            onClick={() => refreshNodes()}
          >
            <i className="fa fa-retweet"/>
          </button>
        </div>
        <div className="right col-md-10">
          {right}
        </div>
      </div>
    </div>
  )
};

export default Row;
