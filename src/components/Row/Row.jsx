import React from "react";

const Row = (props) => {
  const {
    left, right, onClick, isDisabled,
  } = props;
  return (
    <div className="row mb2">
      <div className="col-md-5">
        {left}
      </div>
      <div className="col-md-1 d-flex flex-column">
        <button
          type="button"
          className="btn btn-success"
          onClick={onClick('add')}
        >
          <i className="fa fa-plus"/>
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={onClick('delete')}
          disabled={isDisabled}
        >
          <i className="fa fa-minus"/>
        </button>
      </div>
      <div className="col-md-5">
        {right}
      </div>
    </div>
  )
};

export default Row;
