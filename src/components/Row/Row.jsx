import React from "react";
import PropTypes from 'prop-types';

import './row.css';

const Row = ({ left, right }) => (
  <div>
    <div className="row mb2">
      <div className="col-md-6">
        <div className="left">
          {left}
        </div>
      </div>
      <div className="col-md-6 sticky">
        <div className="right">
          {right}
        </div>
      </div>
    </div>
  </div>
);

Row.propTypes = {
  left: PropTypes.node,
  right: PropTypes.node,
};

export default Row;